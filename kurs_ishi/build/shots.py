import os, subprocess, sys, time, tempfile
from playwright.sync_api import sync_playwright

PROJECT = str(__import__("pathlib").Path(__file__).resolve().parents[2])
OUT = PROJECT + "/kurs_ishi/rasmlar"
db = tempfile.mktemp(suffix=".sqlite")
server = subprocess.Popen([sys.executable, PROJECT + "/app.py"], env={**os.environ, "DATABASE_FILE": db}, cwd=PROJECT,
                          stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(2)
BASE = "http://127.0.0.1:8080"
clients = [("Karimov Aziz Baxtiyorovich", "+998 90 123 45 67", "Sotuvchi"),
           ("Rahimova Dilnoza Olimovna", "+998 91 234 56 78", "Xaridor"),
           ("Tursunov Jasur Anvarovich", "+998 93 345 67 89", "Xaridor"),
           ("Yusupova Madina Karimovna", "+998 97 456 78 90", "Sotuvchi"),
           ("Nazarov Sardor Ilhomovich", "+998 99 567 89 01", "Xaridor")]
properties = [("Toshkent sh., Chilonzor t., 9-kvartal, 12-uy", "Kvartira", 3, 72, 58000),
              ("Toshkent sh., Yunusobod t., 4-mavze, 25-uy", "Kvartira", 2, 54, 47000),
              ("Toshkent sh., Mirzo Ulugʻbek t., Buyuk Ipak Yoʻli 80", "Ofis", 4, 120, 135000),
              ("Toshkent v., Zangiota t., Qorasuv QFY", "Yer uchastkasi", 0, 600, 32000),
              ("Samarqand sh., Registon k., 15-uy", "Uy", 5, 180, 96000)]
try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        def new_page(width=1100):
            return browser.new_context(viewport={"width": width, "height": 400}, locale="uz").new_page()
        page = new_page()
        page.goto(BASE + "/login"); page.screenshot(path=OUT + "/login.png")
        page.fill("input[name=login]", "admin"); page.fill("input[name=password]", "admin123"); page.click("button")
        for name, phone, role in clients:
            page.request.post(BASE + "/clients/save", form={"id": "0", "name": name, "phone": phone, "role": role})
        for address, kind, rooms, area, price in properties:
            page.request.post(BASE + "/properties/save", form={"id": "0", "address": address, "type": kind, "rooms": str(rooms), "area": str(area), "price": str(price)})
        page.request.post(BASE + "/deals/add", form={"property_id": "1", "client_id": "2", "price": "56000", "deal_date": "2026-10-12"})
        page.request.post(BASE + "/deals/add", form={"property_id": "3", "client_id": "3", "price": "130000", "deal_date": "2026-10-18"})
        for path, name in [("/", "home"), ("/properties", "properties"), ("/clients", "clients"), ("/deals", "deals"), ("/properties?edit=2", "property_edit")]:
            page.goto(BASE + path); page.screenshot(path=f"{OUT}/{name}.png", full_page=True)
        agent = new_page()
        agent.goto(BASE + "/login"); agent.fill("input[name=login]", "agent"); agent.fill("input[name=password]", "agent123"); agent.click("button")
        agent.goto(BASE + "/properties"); agent.screenshot(path=OUT + "/properties_agent.png", full_page=True)
        status = agent.request.post(BASE + "/properties/delete", form={"id": "2"}).status
        print("agent delete status:", status)
        # UML diagrammalar
        uml = browser.new_context(viewport={"width": 1100, "height": 800}, device_scale_factor=2).new_page()
        uml.goto("file://" + PROJECT + "/uml.html")
        for i, el in enumerate(uml.query_selector_all("svg"), 1):
            el.screenshot(path=f"{OUT}/uml{i}.png")
        browser.close()
finally:
    server.terminate()
