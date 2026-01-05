from history_data import get_data_to_insert
import mysql.connector
import time
import os

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "db"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "database": os.getenv("DB_NAME"),
}

RETRY_INTERVAL = 5
db = os.getenv("DB_NAME")

def get_db_connection():
    while True:
        try:
            conn = mysql.connector.connect(**DB_CONFIG)
            print("DB connection established")
            return conn
        except mysql.connector.Error as e:
            print(f"DB connection failed: {e}. Retrying in {RETRY_INTERVAL}s...")
            time.sleep(RETRY_INTERVAL)

def check_and_create_db(conn):
    cur = conn.cursor()
    try:
        cur.execute(f"SHOW DATABASES LIKE '{db}';")
        if not cur.fetchone():
            print(f"Database does not exist. Creating database {db}...")
            cur.execute(f"CREATE DATABASE {db};")
        else:
            print(f"Database {db} already exists.")
    except mysql.connector.Error as e:
        print(f"Error checking or creating database: {e}")
    finally:
        cur.close()

def check_and_create_table(conn):
    cur = conn.cursor()
    try:
        cur.execute(f"USE {db};")
        cur.execute("SHOW TABLES LIKE 'monthly_exchange_rates';")
        if not cur.fetchone():
            print("Table does not exist. Creating table...")
            cur.execute("""
                        CREATE TABLE monthly_exchange_rates(
                            exchange_month VARCHAR(7) NOT NULL,
                            average_rate DECIMAL(10, 4) NOT NULL,
                            PRIMARY KEY (exchange_month)
                        );
            """)
            print("Table created successfully.")
        else:
            print("Table already exists.")
    except mysql.connector.Error as e:
        print(f"Error checking or creating table: {e}")
    finally:
        cur.close()

def insert_initial_data(conn):
    cur = conn.cursor()
    try:
        cur.execute("SELECT COUNT(*) FROM monthly_exchange_rates;")
        count = cur.fetchone()[0]
        if count == 0:
            print("Inserting initial data...")
            # initial_data = [
            #     ('2023-01', 3.446474748709677), ('2023-02', 3.540209297857143), ('2023-03', 3.6233573609677423),
            #     ('2023-04', 3.634214590333333), ('2023-05', 3.6679877193548402), ('2023-06', 3.6404749146666675),
            #     ('2023-07', 3.667405767741935), ('2023-08', 3.744048214516129), ('2023-09', 3.8181020086666666),
            #     ('2023-10', 3.9759772790322594), ('2023-11', 3.8097557676666667), ('2023-12', 3.6677924696774196),
            #     ('2024-01', 3.7097846377419357), ('2024-02', 3.647773227931034), ('2024-03', 3.6261017535483875),
            #     ('2024-04', 3.752593964666667), ('2024-05', 3.7025414958064515), ('2024-06', 3.7285878443333327),
            #     ('2024-07', 3.6735686035483868), ('2024-08', 3.72854761483871), ('2024-09', 3.72739593),
            #     ('2024-10', 3.763225393870968), ('2024-11', 3.7227250249999995), ('2024-12', 3.6234535951612914),
            #     ('2025-01', 3.6190515516129036), ('2025-02', 3.5670510878571435), ('2025-03', 3.6528782425806448),
            #     ('2025-04', 3.6956970553333344), ('2025-05', 3.5695056690322575), ('2025-06', 3.489311891666667),
            #     ('2025-07', 3.3501747761290326), ('2025-08', 3.3938932167741935), ('2025-09', 3.342425992666666),
            #     ('2025-10', 3.2894177854838715), ('2025-11', 3.2557721343333332)
            # ]
            initial_data= get_data_to_insert()
            cur.executemany("INSERT INTO monthly_exchange_rates (exchange_month, average_rate) VALUES (%s, %s);", initial_data)
            conn.commit()
            print("Initial data inserted.")
        else:
            print("Data already exists in the table.")
    except mysql.connector.Error as e:
        print(f"Error inserting data: {e}")
    finally:
        cur.close()

def main():
    try:
        conn = get_db_connection()
        check_and_create_db(conn)
        check_and_create_table(conn)
        insert_initial_data(conn)
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
