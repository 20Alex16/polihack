#include <Arduino.h>
// import json DAAA
#include <ArduinoJson.h>

DynamicJsonDocument doc(1024);

void setup()
{
	pinMode(A0, INPUT);
	pinMode(A1, INPUT);
	pinMode(A2, INPUT);
	Serial.begin(9600);
}

float value(int read){
	return read * (5.f / 1023.f);
}

void loop()
{
	doc["priza1"] = value(analogRead(A0));
	doc["priza2"] = value(analogRead(A1));
	doc["priza3"] = value(analogRead(A2));

	serializeJson(doc, Serial);
	Serial.println();

	delay(200);
}