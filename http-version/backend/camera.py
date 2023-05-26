import os 
import random
import cv2

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

def getImagesFromCamera(machineId, camera_link):
    START=0
    LIMIT=5
    pathOut = "../congestion-dataset/machine"+str(machineId)
    pathIn = camera_link

    try:
        os.mkdir(pathOut)
    except OSError:
        pass

    image_path_list = []

    count = START
    vidcap = cv2.VideoCapture(pathIn)
    success,image = vidcap.read()
    success = True
    while True:
        vidcap.set(cv2.CAP_PROP_POS_MSEC,(count*1000))    # added this line 
        success,image = vidcap.read()
        if not success: break;
        print ('Read a new frame: ', success)
        cv2.imwrite( pathOut + "/frame%d.jpg" % count, image)     # save frame as JPEG file
        image_path_list.append(pathOut + "/frame%d.jpg" % count)
        count = count + 1
        if count>LIMIT: break
    return image_path_list

#createFolderForWorkstation(2)
#getLatestImageForWorkstation(2)