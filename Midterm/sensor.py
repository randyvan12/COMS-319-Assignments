import time
import board
import adafruit_dht
import json
dhtDevice = adafruit_dht.DHT11(board.D4, use_pulseio=False)

while True:
    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        dictionary = {}
        dictionary["date"] = time.strftime("%I:%M:%S%p %d/%m/%Y", time.gmtime())
        dictionary["temperature_f"] = temperature_f
        dictionary["temperature_c"] = temperature_c
        dictionary["humidity"] = humidity
        outfile = open("data.json", "w")
        json.dump(dictionary, outfile, indent = 4)
        print("Temp: {:.1f} F / {:.1f} C    Humidity: {}%".format(temperature_f, temperature_c, humidity))
    except RuntimeError as error:
        print(error.args[0])
    time.sleep(2.0)
