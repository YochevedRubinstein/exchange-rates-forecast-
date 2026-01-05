import os
import mysql.connector
from datetime import date
from rate_calc import monthly_average

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "db"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "database": os.getenv("DB_NAME"),
}

def main():
    today = date.today()
    if today.month == 1:
        year = today.year - 1
        month = 12
    else:
        year = today.year
        month = today.month - 1

    avg = monthly_average(year, month)
    year_month = f"{year}-{month:02d}"

    conn = mysql.connector.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO monthly_exchange_rates (year_month, average_rate)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE average_rate = VALUES(average_rate)
        """,
        (year_month, avg),
    )

    conn.commit()
    conn.close()
    print(f"monthly update done for {year_month}")

if __name__ == "__main__":
    main()
