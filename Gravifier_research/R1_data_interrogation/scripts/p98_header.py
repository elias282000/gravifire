import openpyxl

wb = openpyxl.load_workbook(
    "/home/elias/Codes/NSAC/psidata/PSI-98/Raw Data/PSI-98_Raw Data_Saffire-I Sample 2 Sensor Data Complete TM graphs.xlsx",
    read_only=True, data_only=True)
ws = wb["Calibrated Data"]
rows = ws.iter_rows(min_row=1, max_row=2, values_only=True)
names = [("" if v is None else str(v).strip()) for v in next(rows)]
units = [("" if v is None else str(v).strip()) for v in next(rows)]
for i, (n, u) in enumerate(zip(names, units)):
    suffix = "|" + u if u else ""
    print(f"{i:2d}  {n}{suffix}")
wb.close()
