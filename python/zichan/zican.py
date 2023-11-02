import tkinter as tk
import tkinter.ttk as ttk
import coindata
from data import coin, fund, dk
import datetime
import time
import threading

root = tk.Tk()

root.title("资产")

root.geometry('600x330+400+250')

notebook = ttk.Notebook(root)

pages = []
tables = []
labels = []
totals = [0.0, 0.0, 0.0]
window_text = ['加密货币', '基金', '负债']
columns = [[('名称', 150), ('储量', 150), ('价格', 150), ('价值', 150)],
           [('名称', 120), ('持仓', 120), ('年化', 120), ('开始', 120), ('收益', 120)],
           [('名称', 120), ('额度', 120), ('利率', 120), ('开始', 120), ('利息', 120)]]

for i in range(3):
    pages.append(tk.Frame())

i = 0

# 将窗口添加到标题栏
for page in pages:
    tables.append(ttk.Treeview(page, height=10,
                  columns=[column[0]
                           for column in columns[i]], show='headings'
    ))
    labels.append(tk.Label(page, text='总计'))
    notebook.add(page, text=window_text[i])
    i += 1

notebook.pack(padx=2, pady=1, fill=tk.BOTH, expand=True)

i = 0
# 渲染表格
for table in tables:
    for column in columns[i]:
        table.heading(column=column[0], text=column[0], anchor='w')  # 定义表头
        table.column(column[0], width=column[1], anchor='w')  # 定义列
    table.pack()
    i += 1

# 渲染标题
for label in labels:
    label.pack()

###  渲染基金数据  ###
for index, data in enumerate(coindata.GetFund(fund)):
    tables[1].insert('',  index=index, values=data)
    totals[1] += data[1] + data[4]

labels[1].config(text='总计:' + str(round(totals[1], 2)))

for index, data in enumerate(coindata.GetDk(dk)):
    tables[2].insert('',  index=index, values=data)
    totals[2] += data[1] + data[4]

    labels[2].config(text='总计:' + str(round(totals[2], 2)))

label_total = tk.Label(root, text='总计:'+str(round(totals[0]+totals[1]-totals[2], 2)))
label_total.pack()

mytime = datetime.datetime.now()

label_total1 = tk.Label(root, text='更新时间:'+str(mytime.hour)+':'+str(mytime.minute))
label_total1.pack()

def update(tables:ttk.Treeview):
    while True:
        tmp = enumerate(coindata.GetCoin(coin))
        tables[0].delete(*tables[0].get_children())
        totals[0]=0
        ###  渲染加密货币数据  ###
        for index, data in tmp:
            tables[0].insert('', index=index, values=data)
            totals[0] += data[3]
        labels[0].config(text='总计:' + str(round(totals[0], 0)))
        label_total.config(text='总计:'+str(round(totals[0]+totals[1]-totals[2], 2)))
        mytime = datetime.datetime.now()
        label_total1.config(text='更新时间:'+str(mytime.hour)+':'+str(mytime.minute))
        time.sleep(1)

thread = threading.Thread(target=update,args=(tables,))
thread.start()

root.mainloop()
