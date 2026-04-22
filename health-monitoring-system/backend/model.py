import numpy as np
from sklearn.ensemble import IsolationForest

data = np.array([[70], [72], [75], [200], [73], [71]])

model = IsolationForest(contamination=0.2)
model.fit(data)

def check_anomaly(value):
    pred = model.predict([[value]])
    return "Anomaly" if pred[0] == -1 else "Normal"