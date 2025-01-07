import time
import multiprocessing
import random

def myprocess(x):
    if x%2!=0 :
        time.sleep(x)
    else: time.sleep(10)
    print("Output: {}".format(x*x))
    return x*x

def getInput():
    sleepTime = random.randint(0,3)
    print("Input gonna sleep for {} seconds".format(sleepTime))
    time.sleep(sleepTime)
    return random.randint(0,9)

if __name__=="__main__":
    pool = multiprocessing.Pool(processes=4)

    while True:
        inp = getInput()
        print("Done fetching inputs "+str(inp))
        pool.map_async(myprocess, [inp])




