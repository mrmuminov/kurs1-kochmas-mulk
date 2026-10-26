# Ilovaning HTTP chegarasi bo'yicha testlar. Ishga tushirish: python -m unittest test_app

import os
import tempfile
import unittest

import app as agency


class AgencyTest(unittest.TestCase):

    def setUp(self):
        # Har bir test uchun alohida bo'sh baza
        handle, self.database_file = tempfile.mkstemp(suffix=".sqlite")
        os.close(handle)
        agency.DATABASE_FILE = self.database_file
        agency.create_tables()
        self.client = agency.app.test_client()

    def tearDown(self):
        os.remove(self.database_file)

    def login(self, login, password):
        return self.client.post("/login", data={"login": login, "password": password})

    def add_property(self, address="Chilonzor 5"):
        self.client.post("/properties/save", data={"id": "0", "address": address, "type": "Kvartira",
                                                    "rooms": "3", "area": "70", "price": "50000"})

    def add_client(self, name="Aliyev", role="Xaridor"):
        self.client.post("/clients/save", data={"id": "0", "name": name, "phone": "901234567", "role": role})

    def count(self, table):
        db = agency.connect()
        result = db.execute("SELECT COUNT(*) FROM " + table).fetchone()[0]
        db.close()
        return result

    def test_anonymous_is_redirected_to_login(self):
        for path in ("/", "/properties", "/clients", "/deals"):
            response = self.client.get(path)
            self.assertEqual(response.status_code, 302)
            self.assertTrue(response.headers["Location"].endswith("/login"))

    def test_wrong_password_is_rejected(self):
        response = self.login("admin", "wrong")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Login yoki parol", response.get_data(as_text=True))
        self.assertEqual(self.client.get("/").status_code, 302)

    def test_correct_password_logs_in_and_logout_ends_session(self):
        self.assertEqual(self.login("agent", "agent123").status_code, 302)
        self.assertEqual(self.client.get("/").status_code, 200)
        self.client.get("/logout")
        self.assertEqual(self.client.get("/").status_code, 302)

    def test_passwords_are_stored_hashed(self):
        db = agency.connect()
        hashes = [row[0] for row in db.execute("SELECT password_hash FROM users")]
        db.close()
        self.assertEqual(len(hashes), 2)
        self.assertNotIn("admin123", hashes)
        self.assertNotIn("agent123", hashes)

    def test_agent_cannot_delete_and_sees_no_delete_button(self):
        self.login("admin", "admin123")
        self.add_property()
        self.add_client()
        self.client.get("/logout")
        self.login("agent", "agent123")
        self.assertEqual(self.client.post("/properties/delete", data={"id": "1"}).status_code, 403)
        self.assertEqual(self.client.post("/clients/delete", data={"id": "1"}).status_code, 403)
        self.assertEqual(self.count("properties"), 1)
        self.assertEqual(self.count("clients"), 1)
        self.assertNotIn("/properties/delete", self.client.get("/properties").get_data(as_text=True))
        self.assertNotIn("/clients/delete", self.client.get("/clients").get_data(as_text=True))

    def test_agent_can_add_property_and_client(self):
        self.login("agent", "agent123")
        self.add_property()
        self.add_client()
        self.assertEqual(self.count("properties"), 1)
        self.assertEqual(self.count("clients"), 1)

    def test_admin_can_delete(self):
        self.login("admin", "admin123")
        self.add_property()
        self.add_client()
        self.client.post("/properties/delete", data={"id": "1"})
        self.client.post("/clients/delete", data={"id": "1"})
        self.assertEqual(self.count("properties"), 0)
        self.assertEqual(self.count("clients"), 0)

    def test_deal_calculates_commission_and_marks_property_sold(self):
        self.login("agent", "agent123")
        self.add_property()
        self.add_client()
        self.client.post("/deals/add", data={"property_id": "1", "client_id": "1", "price": "40000",
                                              "deal_date": "2026-10-01"})
        db = agency.connect()
        deal = db.execute("SELECT * FROM deals").fetchone()
        sold = db.execute("SELECT sold FROM properties WHERE id = 1").fetchone()[0]
        db.close()
        self.assertEqual(deal["commission"], 800)
        self.assertEqual(sold, 1)

    def test_property_and_client_with_deal_cannot_be_deleted(self):
        self.login("admin", "admin123")
        self.add_property()
        self.add_client()
        self.client.post("/deals/add", data={"property_id": "1", "client_id": "1", "price": "40000",
                                              "deal_date": "2026-10-01"})
        self.client.post("/properties/delete", data={"id": "1"})
        self.client.post("/clients/delete", data={"id": "1"})
        self.assertEqual(self.count("properties"), 1)
        self.assertEqual(self.count("clients"), 1)

    def test_home_shows_income(self):
        self.login("agent", "agent123")
        self.add_property()
        self.add_client()
        self.client.post("/deals/add", data={"property_id": "1", "client_id": "1", "price": "40000",
                                              "deal_date": "2026-10-01"})
        self.assertIn("800.00", self.client.get("/").get_data(as_text=True))


if __name__ == "__main__":
    unittest.main()
