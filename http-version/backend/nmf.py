import joblib
import numpy as np
import cv2

kmeans = joblib.load("kmeans.sav")
w = joblib.load("w.sav")
h = joblib.load("h.sav")
height = joblib.load("height.sav")
width = joblib.load("width.sav")

# image_path = "cv2_extracted_images/frame0.jpg"
def getCongestionStatusForImage(image_path):
    print("Testing congestion for image: "+image_path)
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    #resize
    dim = (width, height)
    resized = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
    
    rows,cols=resized.shape #normal shape
    img_size = rows*cols
    img_1D_vector = resized.reshape(img_size)
    
    return kmeans.predict(np.matmul(np.transpose(img_1D_vector.reshape(-1,1)), np.transpose(h)))[0]

print(getCongestionStatusForImage("/home/abhijit/rmg_images/frame0.jpg"))
