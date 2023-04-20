import os 
import random

imageSource = "/home/abhijit/rmg_images/"

def createFolderForWorkstation(workstationId):
    try:
        os.mkdir("../congestion-dataset/machine"+str(workstationId))
    except:
        print("Failed to create folder for workstation "+str(workstationId))

def getLatestImageForWorkstation(workstationId):
    # move photo from a directory to this "machine"+str(workstationId)
    randNum = random.randint(0,200)
    img_name = "frame"+str(randNum)+".jpg"

    src = imageSource+img_name
    dest = "../congestion-dataset/machine"+str(workstationId)
    print(src,dest)

    # In Linux/Unix
    os.system("cp "+src+" "+ dest)  
    return dest +"/"+ img_name


#createFolderForWorkstation(2)
#getLatestImageForWorkstation(2)