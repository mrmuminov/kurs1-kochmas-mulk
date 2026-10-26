# Ko'chmas mulk agentligi - butun ilova shu faylda.
# Ishga tushirish: python3 app.py (Windows'da: py app.py), keyin brauzerda http://localhost:8080

import os
import sqlite3
from datetime import date

from flask import Flask, abort, redirect, render_template_string, request, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash

FOLDER = os.path.dirname(os.path.abspath(__file__))
DATABASE_FILE = os.environ.get("DATABASE_FILE", os.path.join(FOLDER, "database.sqlite"))

TYPES = ["Kvartira", "Uy", "Yer uchastkasi", "Ofis"]
ROLES = ["Sotuvchi", "Xaridor"]

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "kurs1-development-key")


# ---------- Baza ----------

def connect():
    db = sqlite3.connect(DATABASE_FILE)
    db.row_factory = sqlite3.Row
    return db


def create_tables():
    db = connect()
    db.executescript("""
        CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT NOT NULL, type TEXT NOT NULL,
            rooms INTEGER DEFAULT 0, area REAL NOT NULL, price REAL NOT NULL, sold INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, role TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS deals (id INTEGER PRIMARY KEY AUTOINCREMENT, property_id INTEGER NOT NULL, client_id INTEGER NOT NULL,
            price REAL NOT NULL, commission REAL NOT NULL, deal_date TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL, role TEXT NOT NULL);
    """)
    # Birinchi ishga tushirishda ikkita foydalanuvchi yaratiladi
    if db.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 0:
        db.execute("INSERT INTO users (login, password_hash, role) VALUES (?, ?, ?)",
                   ["admin", generate_password_hash("admin123"), "admin"])
        db.execute("INSERT INTO users (login, password_hash, role) VALUES (?, ?, ?)",
                   ["agent", generate_password_hash("agent123"), "agent"])
        db.commit()
    db.close()


create_tables()


# ---------- Sahifa shabloni (HTML) ----------

PAGE = r"""<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ko'chmas mulk agentligi</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>

  <h1>Ko'chmas mulk agentligi</h1>

  {% if user_login %}
  <div class="menu">
    <a href="/">Bosh sahifa</a>
    <a href="/properties">Obyektlar</a>
    <a href="/clients">Mijozlar</a>
    <a href="/deals">Bitimlar</a>
    <span class="user">{{ user_login }} ({{ user_role }}) <a href="/logout">Chiqish</a></span>
  </div>
  {% endif %}

  <div class="section">

  {% if page == "login" %}

    <h2>Tizimga kirish</h2>
    {% if error %}<p class="error">{{ error }}</p>{% endif %}
    <form method="post" action="/login">
      <input name="login" placeholder="Login" required>
      <input name="password" type="password" placeholder="Parol" required>
      <button type="submit">Kirish</button>
    </form>

  {% elif page == "home" %}

    <h2>Umumiy ma'lumot</h2>
    <div class="cards">
      <div class="card">Obyektlar: <b>{{ property_count }}</b></div>
      <div class="card">Sotuvda: <b>{{ free_count }}</b></div>
      <div class="card">Mijozlar: <b>{{ client_count }}</b></div>
      <div class="card">Bitimlar: <b>{{ deal_count }}</b></div>
      <div class="card">Jami daromad: <b>{{ "%.2f"|format(income) }} $</b></div>
    </div>

  {% elif page == "properties" %}

    <h2>Obyektlar</h2>
    <form method="post" action="/properties/save">
      <input type="hidden" name="id" value="{{ row["id"] }}">
      <input name="address" placeholder="Manzil" value="{{ row["address"] }}" required>
      <select name="type">
        {% for type in types %}
          <option {% if row["type"] == type %}selected{% endif %}>{{ type }}</option>
        {% endfor %}
      </select>
      <input name="rooms" type="number" placeholder="Xonalar soni" min="0" value="{{ row["rooms"] }}">
      <input name="area" type="number" placeholder="Maydon (m²)" min="1" value="{{ row["area"] }}" required>
      <input name="price" type="number" placeholder="Narx ($)" min="1" value="{{ row["price"] }}" required>
      {% if row["id"] != 0 %}
        <button type="submit">Saqlash</button>
        <a href="/properties">Bekor qilish</a>
      {% else %}
        <button type="submit">Qo'shish</button>
      {% endif %}
    </form>

    <table>
      <tr><th>№</th><th>Manzil</th><th>Turi</th><th>Xona</th><th>Maydon</th><th>Narx ($)</th><th>Holati</th><th></th></tr>
      {% for property in items %}
        <tr>
          <td>{{ property["id"] }}</td>
          <td>{{ property["address"] }}</td>
          <td>{{ property["type"] }}</td>
          <td>{{ property["rooms"] }}</td>
          <td>{{ property["area"]|int }} m²</td>
          <td>{{ property["price"]|int }}</td>
          {% if property["sold"] == 1 %}
            <td class="sold">Sotilgan</td>
          {% else %}
            <td class="free">Sotuvda</td>
          {% endif %}
          <td>
            <a href="/properties?edit={{ property["id"] }}" class="edit-button">Tahrirlash</a>
            {% if user_role == "admin" %}
            <form method="post" action="/properties/delete" class="inline" onsubmit="return confirm('O\'chirishni xohlaysizmi?')">
              <input type="hidden" name="id" value="{{ property["id"] }}">
              <button type="submit" class="delete-button">O'chirish</button>
            </form>
            {% endif %}
          </td>
        </tr>
      {% endfor %}
    </table>

  {% elif page == "clients" %}

    <h2>Mijozlar</h2>
    <form method="post" action="/clients/save">
      <input type="hidden" name="id" value="{{ row["id"] }}">
      <input name="name" placeholder="F.I.Sh" value="{{ row["name"] }}" required>
      <input name="phone" placeholder="Telefon" value="{{ row["phone"] }}" required>
      <select name="role">
        {% for role in roles %}
          <option {% if row["role"] == role %}selected{% endif %}>{{ role }}</option>
        {% endfor %}
      </select>
      {% if row["id"] != 0 %}
        <button type="submit">Saqlash</button>
        <a href="/clients">Bekor qilish</a>
      {% else %}
        <button type="submit">Qo'shish</button>
      {% endif %}
    </form>

    <table>
      <tr><th>№</th><th>F.I.Sh</th><th>Telefon</th><th>Kim</th><th></th></tr>
      {% for client in items %}
        <tr>
          <td>{{ client["id"] }}</td>
          <td>{{ client["name"] }}</td>
          <td>{{ client["phone"] }}</td>
          <td>{{ client["role"] }}</td>
          <td>
            <a href="/clients?edit={{ client["id"] }}" class="edit-button">Tahrirlash</a>
            {% if user_role == "admin" %}
            <form method="post" action="/clients/delete" class="inline" onsubmit="return confirm('O\'chirishni xohlaysizmi?')">
              <input type="hidden" name="id" value="{{ client["id"] }}">
              <button type="submit" class="delete-button">O'chirish</button>
            </form>
            {% endif %}
          </td>
        </tr>
      {% endfor %}
    </table>

  {% elif page == "deals" %}

    <h2>Bitimlar</h2>
    <form method="post" action="/deals/add">
      <select name="property_id" required>
        <option value="">Obyektni tanlang</option>
        {% for property in free_properties %}
          <option value="{{ property["id"] }}">{{ property["address"] }} ({{ property["price"]|int }}$)</option>
        {% endfor %}
      </select>
      <select name="client_id" required>
        <option value="">Xaridorni tanlang</option>
        {% for buyer in buyers %}
          <option value="{{ buyer["id"] }}">{{ buyer["name"] }}</option>
        {% endfor %}
      </select>
      <input name="price" type="number" placeholder="Kelishilgan narx ($)" min="1" required>
      <input name="deal_date" type="date" value="{{ today }}" required>
      <button type="submit">Bitim tuzish</button>
    </form>

    <table>
      <tr><th>№</th><th>Obyekt</th><th>Xaridor</th><th>Narx ($)</th><th>Komissiya 2% ($)</th><th>Sana</th></tr>
      {% for deal in items %}
        <tr>
          <td>{{ deal["id"] }}</td>
          <td>{{ deal["address"] or "o'chirilgan" }}</td>
          <td>{{ deal["client_name"] or "o'chirilgan" }}</td>
          <td>{{ deal["price"]|int }}</td>
          <td>{{ "%.2f"|format(deal["commission"]) }}</td>
          <td>{{ deal["deal_date"] }}</td>
        </tr>
      {% endfor %}
    </table>

  {% endif %}

  </div>
</body>
</html>
"""


# ---------- Kirish va rollar ----------

@app.context_processor
def current_user():
    return {"user_login": session.get("login"), "user_role": session.get("role")}


@app.before_request
def require_login():
    # Kirmagan foydalanuvchi faqat kirish sahifasi va dizaynni ko'ra oladi
    if "login" not in session and request.endpoint not in ("login", "style"):
        return redirect("/login")


def admin_only():
    # O'chirish faqat administratorga ruxsat etiladi
    if session.get("role") != "admin":
        abort(403)


@app.route("/login", methods=["GET", "POST"])
def login():
    error = ""
    if request.method == "POST":
        db = connect()
        user = db.execute("SELECT * FROM users WHERE login = ?", [request.form.get("login", "").strip()]).fetchone()
        db.close()
        if user is not None and check_password_hash(user["password_hash"], request.form.get("password", "")):
            session["login"] = user["login"]
            session["role"] = user["role"]
            return redirect("/")
        error = "Login yoki parol noto'g'ri"
    return render_template_string(PAGE, page="login", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")


# ---------- Dizayn fayli ----------

@app.route("/style.css")
def style():
    return send_from_directory(FOLDER, "style.css")


# ---------- Bosh sahifa ----------

@app.route("/")
def home():
    db = connect()
    property_count = db.execute("SELECT COUNT(*) FROM properties").fetchone()[0]
    free_count = db.execute("SELECT COUNT(*) FROM properties WHERE sold = 0").fetchone()[0]
    client_count = db.execute("SELECT COUNT(*) FROM clients").fetchone()[0]
    deal_count = db.execute("SELECT COUNT(*) FROM deals").fetchone()[0]
    income = db.execute("SELECT SUM(commission) FROM deals").fetchone()[0] or 0
    db.close()
    return render_template_string(PAGE, page="home", property_count=property_count, free_count=free_count,
                                  client_count=client_count, deal_count=deal_count, income=income)


# ---------- Obyektlar ----------

@app.route("/properties")
def properties():
    db = connect()
    # Forma bo'sh bo'ladi. Tahrirlash bosilsa, shu obyekt ma'lumotlari bilan to'ladi.
    row = {"id": 0, "address": "", "type": "", "rooms": "", "area": "", "price": ""}
    edit_id = request.args.get("edit")
    if edit_id:
        found = db.execute("SELECT * FROM properties WHERE id = ?", [edit_id]).fetchone()
        if found is None:
            db.close()
            return redirect("/properties")
        row = found
    items = db.execute("SELECT * FROM properties ORDER BY id DESC").fetchall()
    db.close()
    return render_template_string(PAGE, page="properties", row=row, items=items, types=TYPES)


@app.route("/properties/save", methods=["POST"])
def save_property():
    property_id = request.form.get("id", "0")
    address = request.form.get("address", "").strip()
    property_type = request.form.get("type", "")
    rooms = request.form.get("rooms", "").strip()
    area = request.form.get("area", "").strip()
    price = request.form.get("price", "").strip()
    if rooms == "":
        rooms = "0"

    # Xato bo'lsa, forma qayta ochiladi
    back_to_form = "/properties"
    if property_id != "0":
        back_to_form = "/properties?edit=" + property_id
    if address == "" or property_type not in TYPES:
        return redirect(back_to_form)
    if not rooms.isdecimal() or not area.isdecimal() or not price.isdecimal():
        return redirect(back_to_form)
    if int(area) == 0 or int(price) == 0:
        return redirect(back_to_form)

    db = connect()
    if property_id != "0":
        db.execute("UPDATE properties SET address = ?, type = ?, rooms = ?, area = ?, price = ? WHERE id = ?",
                   [address, property_type, rooms, area, price, property_id])
    else:
        db.execute("INSERT INTO properties (address, type, rooms, area, price) VALUES (?, ?, ?, ?, ?)",
                   [address, property_type, rooms, area, price])
    db.commit()
    db.close()
    return redirect("/properties")


@app.route("/properties/delete", methods=["POST"])
def delete_property():
    admin_only()
    property_id = request.form.get("id", "0")
    db = connect()
    # Bitimi bor obyektni o'chirib bo'lmaydi
    deal_count = db.execute("SELECT COUNT(*) FROM deals WHERE property_id = ?", [property_id]).fetchone()[0]
    if deal_count == 0:
        db.execute("DELETE FROM properties WHERE id = ?", [property_id])
        db.commit()
    db.close()
    return redirect("/properties")


# ---------- Mijozlar ----------

@app.route("/clients")
def clients():
    db = connect()
    row = {"id": 0, "name": "", "phone": "", "role": ""}
    edit_id = request.args.get("edit")
    if edit_id:
        found = db.execute("SELECT * FROM clients WHERE id = ?", [edit_id]).fetchone()
        if found is None:
            db.close()
            return redirect("/clients")
        row = found
    items = db.execute("SELECT * FROM clients ORDER BY id DESC").fetchall()
    db.close()
    return render_template_string(PAGE, page="clients", row=row, items=items, roles=ROLES)


@app.route("/clients/save", methods=["POST"])
def save_client():
    client_id = request.form.get("id", "0")
    name = request.form.get("name", "").strip()
    phone = request.form.get("phone", "").strip()
    role = request.form.get("role", "")

    back_to_form = "/clients"
    if client_id != "0":
        back_to_form = "/clients?edit=" + client_id
    if name == "" or phone == "" or role not in ROLES:
        return redirect(back_to_form)

    db = connect()
    if client_id != "0":
        db.execute("UPDATE clients SET name = ?, phone = ?, role = ? WHERE id = ?", [name, phone, role, client_id])
    else:
        db.execute("INSERT INTO clients (name, phone, role) VALUES (?, ?, ?)", [name, phone, role])
    db.commit()
    db.close()
    return redirect("/clients")


@app.route("/clients/delete", methods=["POST"])
def delete_client():
    admin_only()
    client_id = request.form.get("id", "0")
    db = connect()
    # Bitimi bor mijozni o'chirib bo'lmaydi
    deal_count = db.execute("SELECT COUNT(*) FROM deals WHERE client_id = ?", [client_id]).fetchone()[0]
    if deal_count == 0:
        db.execute("DELETE FROM clients WHERE id = ?", [client_id])
        db.commit()
    db.close()
    return redirect("/clients")


# ---------- Bitimlar ----------

@app.route("/deals")
def deals():
    db = connect()
    free_properties = db.execute("SELECT * FROM properties WHERE sold = 0 ORDER BY address").fetchall()
    buyers = db.execute("SELECT * FROM clients WHERE role = 'Xaridor' ORDER BY name").fetchall()
    items = db.execute("""
        SELECT deals.*, properties.address, clients.name AS client_name FROM deals
        LEFT JOIN properties ON properties.id = deals.property_id
        LEFT JOIN clients ON clients.id = deals.client_id
        ORDER BY deals.id DESC
    """).fetchall()
    db.close()
    return render_template_string(PAGE, page="deals", free_properties=free_properties, buyers=buyers,
                                  items=items, today=date.today().isoformat())


@app.route("/deals/add", methods=["POST"])
def add_deal():
    property_id = request.form.get("property_id", "")
    client_id = request.form.get("client_id", "")
    price = request.form.get("price", "").strip()
    deal_date = request.form.get("deal_date", "")

    db = connect()
    # Obyekt sotuvda bo'lishi kerak, mijoz esa xaridor
    property_row = db.execute("SELECT * FROM properties WHERE id = ? AND sold = 0", [property_id]).fetchone()
    client_row = db.execute("SELECT * FROM clients WHERE id = ? AND role = 'Xaridor'", [client_id]).fetchone()

    if property_row is None or client_row is None or deal_date == "" or not price.isdecimal() or int(price) == 0:
        db.close()
        return redirect("/deals")

    # Bitimni saqlaymiz, komissiya 2%
    commission = int(price) * 0.02
    db.execute("INSERT INTO deals (property_id, client_id, price, commission, deal_date) VALUES (?, ?, ?, ?, ?)",
               [property_id, client_id, price, commission, deal_date])
    # Obyekt sotildi
    db.execute("UPDATE properties SET sold = 1 WHERE id = ?", [property_id])
    db.commit()
    db.close()
    return redirect("/deals")


if __name__ == "__main__":
    app.run(host=os.environ.get("HOST", "127.0.0.1"), port=8080)
