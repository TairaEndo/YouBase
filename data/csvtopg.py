#CSVをpsqlに入れるやつ
import csv
import psycopg2

path = "localhost"
port = "5432"
dbname = "vb_db"

conText = "host={} port={} dbname={}"
conText = conText.format(path,port,dbname)
connection = psycopg2.connect(conText)
connection.get_backend_pid()
cur = connection.cursor()

with open('vb.csv', newline='') as csvfile:
    read = csv.reader(csvfile)
    print(read)
    arrays = []
    for row in read:
        row[4] = int(row[3])
        row[6] = int(row[5])
        row[9] = int(row[8])
        
        row = (str(row).replace('[','(').replace(']',');'))
        # print(row)
        arrays.append(row)
        sql = f"INSERT INTO csvtosql VALUES{row}"
        cur.execute(sql)
        connection.commit()
    print(arrays[0])
cur.close()
connection.close()

