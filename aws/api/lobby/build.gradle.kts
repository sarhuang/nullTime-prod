plugins {
    kotlin("jvm") version "1.7.20"
    kotlin("plugin.serialization") version "1.7.20"
    id("com.github.johnrengelman.shadow") version "7.1.2"
}

group = "app.nulltime.api"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))

    // JSON
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1")

    // AWS Integration
    implementation("com.amazonaws:aws-lambda-java-core")
    implementation("com.amazonaws:aws-lambda-java-events:3.11.0")
    implementation("com.amazonaws:aws-lambda-java-log4j2:1.5.1")
//    implementation("software.amazon.awssdk:dynamodb-enhanced:2.18.27")
    implementation("aws.sdk.kotlin:dynamodb:0.17.7-beta")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")

}

buildscript {
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.7.20")
    }
}