#include <Servo.h>
#include <Arduino.h>
#include <ArduinoJson.h>

DynamicJsonDocument doc(1024);

int BuzzerPin = 11; // Connect Buzzer to Arduino pin 11
int Si2 = 1975;
int LaS2 = 1864;
int La2 = 1760;
int SolS2 = 1661;
int Sol2 = 1567;
int FaS2 = 1479;
int Fa2 = 1396;
int Mi2 = 1318;
int ReS2 = 1244;
int Re2 = 1174;
int DoS2 = 1108;
int Do2 = 1046;
// Low Octave
int Si = 987;
int LaS = 932;
int La = 880;
int SolS = 830;
int Sol = 783;
int FaS = 739;
int Fa = 698;
int Mi = 659;
int ReS = 622;
int Re = 587;
int DoS = 554;
int Do = 523;
// define the notes
int rounda = 0;
int roundp = 0;
int white = 0;
int whitep = 0;
int black = 0;
int blackp = 0;
int quaver = 0;
int quaverp = 0;
int semiquaver = 0;
int semiquaverp = 0;
int bpm = 120;
Servo myservo;
int pos = 0;

void setup()
{
  pinMode(BuzzerPin, OUTPUT);
  black = 35000 / bpm;
  blackp = black * 1.5;
  white = black * 2;
  whitep = white * 1.5;
  rounda = black * 4;
  roundp = rounda * 1.5;
  quaver = black / 2;
  quaverp = quaver * 1.5;
  semiquaver = black / 4;
  semiquaverp = semiquaver * 1.5;
  myservo.attach(9);
  Serial.begin(9600);
}

float value(int x)
{
  return x * (5.f / 1023.f);
}

void calculateVoltage()
{
  int led = analogRead(A2);
  int servo = analogRead(A0);
  int buzer = analogRead(A1);

  doc["priza1"] = value(servo);
  doc["priza2"] = value(buzer);
  doc["priza3"] = value(led);

  serializeJson(doc, Serial);
  Serial.println();
}

void loop()
{
  int pos = 0;
  tone(BuzzerPin, Mi, black);
  pos += 10;
  myservo.write(pos);
  calculateVoltage();
  delay(black + 50);
  tone(BuzzerPin, La, black);
  pos += 10;
  myservo.write(pos);
  calculateVoltage();
  delay(black + 50);
  pos += 10;
  myservo.write(pos);
  tone(BuzzerPin, Si, black);
  calculateVoltage();
  delay(black + 50);
  pos += 10;
  myservo.write(pos);
  tone(BuzzerPin, Do2, black);
  calculateVoltage();
  delay(black + 50);
  pos += 10;
  myservo.write(pos);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  delay(2 * white + 50);
  tone(BuzzerPin, Mi, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Si, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Do2, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(2 * white + 50);
  tone(BuzzerPin, Mi, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Si, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Do2, white * 1.3);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(2 * black + 50);
  tone(BuzzerPin, Si, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Do2, white * 1.3);
  calculateVoltage();
  pos += 10;
  myservo.write(pos);
  delay(2 * black + 50);
  tone(BuzzerPin, Si, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, La, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(white + 100);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, Re2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Fa2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Fa2, white * 1.3);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(rounda + 100);
  tone(BuzzerPin, Fa2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Re2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Fa2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Mi2, white * 1.3);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(rounda + 100);
  tone(BuzzerPin, Mi2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Re2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Do2, black);
  calculateVoltage();
  pos -= 10;
  myservo.write(pos);
  delay(black + 50);
  tone(BuzzerPin, Si, white * 1.3);
  calculateVoltage();

  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, Mi2, white * 1.3);
  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, Si, white * 1.3);

  calculateVoltage();

  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, Do2, white * 1.3);

  calculateVoltage();

  pos -= 10;
  myservo.write(pos);
  delay(white + 50);
  tone(BuzzerPin, La, rounda * 1.3);

  calculateVoltage();

  pos -= 10;
  myservo.write(pos);
  delay(rounda + 50);

  /*for (pos = 90; pos <= 180; pos += 1) {
    myservo.write(pos);
      delay(15);
    }
    for (pos = 180; pos >= 90; pos -= 1) { // goes from 180 degrees to 0 degrees
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }*/
}