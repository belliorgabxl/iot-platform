"use client";
import React from "react";
import CodeBlock from "./code";
import DocumentSideBar from "@/components/sidebar/documentSideBar";

export default function Page() {
  const exampleCode1 = `#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// WiFi Credentials
const char *ssid = "Default";
const char *password = "12345678";

// MQTT Broker
const char *mqtt_broker = "4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud";
const char *mqtt_username = "admin";
const char *mqtt_password = "Bam1234!";
const int mqtt_port = 8883;
const char *topic = "esp32/fan";

// GPIO Pins
#define RELAY_PIN 33
#define BLUE_PIN 5
#define GREEN_PIN 18
#define RED_PIN 19

WiFiClientSecure espClient;
PubSubClient client(espClient);

void controlRelayAndLight(bool relayState, bool red, bool green, bool blue) {
    digitalWrite(RELAY_PIN, relayState ? LOW : HIGH);
    Serial.printf("Relay %s\\n", relayState ? "ON" : "OFF");

    digitalWrite(RED_PIN, red ? HIGH : LOW);
    digitalWrite(GREEN_PIN, green ? HIGH : LOW);
    digitalWrite(BLUE_PIN, blue ? HIGH : LOW);
    Serial.printf("Set Color: Red=%d, Green=%d, Blue=%d\\n", red, green, blue);
}

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.printf("\\nMessage arrived in topic: %s\\n", topic);
    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println("Message: " + message);

    if (message == "ctrl/red_on") {
        controlRelayAndLight(true, true, false, false);
    } else if (message == "ctrl/green_on") {
        controlRelayAndLight(true, false, true, false);
    } else if (message == "ctrl/blue_on") {
        controlRelayAndLight(true, false, false, true);
    } else if (message == "ctrl/relay_off") {
        bool redState = digitalRead(RED_PIN);
        bool greenState = digitalRead(GREEN_PIN);
        bool blueState = digitalRead(BLUE_PIN);
        controlRelayAndLight(false, redState, greenState, blueState);
    } else if (message == "ctrl/all_off") {
        controlRelayAndLight(false, false, false, false);
    }
}


`;
  const exampleCode2 = `void setup() {
    Serial.begin(115200);

    pinMode(RELAY_PIN, OUTPUT);
    pinMode(RED_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
    pinMode(BLUE_PIN, OUTPUT);

    controlRelayAndLight(false, false, false, false);

    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\\nWiFi connected");

    espClient.setInsecure();
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the MQTT broker\\n", client_id.c_str());

        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println(" =========== HiveMQ MQTT broker [ Connected ] ============");
            client.publish(topic, "connected");
        } else {
            Serial.print("MQTT connection failed, state: ");
            Serial.println(client.state());
            delay(2000);
        }
    }
    client.subscribe(topic);
}`;
  const exampleCode3 = `void loop() {
  client.loop();
}`;
  return (
    <div className="py-5 bg-gray-800">
      <DocumentSideBar/>
      <div className="w-full flex justify-center">
        <h1 className="text-white text-3xl font-bold text-center w-fit px-10 bg-gray-900  py-2 h-fit rounded-3xl">
          Example Code in ESP32
        </h1>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[800px] mt-4 place-items-start grid gap-3 px-5">
          <div className="grid w-full gap-1">
            <p className="bg-gray-700 py-2 px-5 rounded-md text-white text-sm  w-fit">
              In setting callback function
            </p>
            <CodeBlock code={exampleCode1} language="javascript" />
          </div>


          <div className="grid w-full gap-1">
            <p className="bg-gray-700 py-2 px-5 rounded-md text-white text-sm  w-fit">
              In Void Setup configuration
            </p>
            <CodeBlock code={exampleCode2} language="javascript" />
          </div>


          <div className="grid w-full gap-1">
            <p className="bg-gray-700 py-2 px-5 rounded-md text-white text-sm  w-fit">
              And you can loop you device like this !
            </p>
            <CodeBlock code={exampleCode3} language="javascript" />
          </div>
        </div>
      </div>
    </div>
  );
}
