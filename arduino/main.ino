#include "DFRobot_LCD.h"
#include <DFRobot_HX711.h>
#include <arduino-timer.h>

auto timer = timer_create_default();

DFRobot_HX711 MyScale(4, 5);
DFRobot_LCD lcd(16,2);  //16 characters and 2 lines of show
// PD2?

int clearPin = 2;
int incomingByte = 0;

float weight = 0.0;
int prevWeight = 9;
int currentTime = 0;

String flowSwitch(int val) {
  switch (val) {
    case 0: return "Perfect!  ";
    case 1: return "Too slow! ";
    case 2: return "Too fast! ";
    case 3: return "Connected!";
  }
}

bool drawTimer(void *) {

  int minutes = currentTime / 60;
  if (minutes > 9) {
    currentTime = 0;
    return true;
  }
  int seconds = currentTime % 60;

  lcd.setCursor(10, 0);
  lcd.print(String(minutes) + ":");
  if (seconds < 10) lcd.print(0);
  lcd.print(seconds);

  currentTime++;
  return true; // to repeat the action - false to stop
}

void setup() {
  // initialize
  lcd.init();

  //initial the clear button
  pinMode(clearPin, INPUT);

  //initial the Serial
  Serial.begin(115200);

  timer.every(1000, drawTimer);
}

void loop() {
  // setup buttons
  if (digitalRead(clearPin) == HIGH) {
    currentTime = 0;
    bool dummy = false;
    drawTimer(&dummy);
  }

  timer.tick();

  // get weight
  weight = MyScale.readWeight();
  if (weight <= 0.2) weight = 0.0;
  else if (weight >= 1000) weight = 999.9;

  // if value different than last
  if ((int)(weight * 10.0) != prevWeight) {

    // print the weight
    lcd.setCursor(10, 1);
    if(weight >= 100) {
      lcd.print(weight, 1);
    }
    else if (weight >=10) {
      lcd.print(" " + String(weight, 1));
    }
    else {
      lcd.print("  " + String(weight, 1));
    }

    prevWeight = (int)(weight * 10);

    // if anything to read, read and print
    if (Serial.available()) {

      if (!timer.empty()) {
        timer.cancel();
        lcd.setCursor(10, 0);
        lcd.print("      ");
      }

      // clear Serial from unwanted messages
      while (Serial.available() > 2) {
          char t = Serial.read();
      }

      // read the incoming bytes:
      incomingByte = Serial.read();
      Serial.read();

      lcd.setCursor(0, 0);
      lcd.print(flowSwitch(incomingByte));

    }

    // write bytes
    int w = weight * 10.0;
    byte bytes [2];
    bytes[0] = w;
    bytes[1] = w >> 8;

    Serial.write(bytes, 2);
  }

}
