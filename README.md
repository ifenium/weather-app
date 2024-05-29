
# Soil and Weather Monitoring React App

This is a simple React app that collates soil temperature, humidity, and moisture values from physical hardware using an ESP8266 and soil sensors, connects to Ubidots via HTTP, and displays the data on a dashboard using an iframe. Additionally, it retrieves satellite temperature data such as UVI Index, soil temperature, and moisture from the AgroMonitoring weather API. The app also includes a section to detect plant diseases from leaf images using a plant disease classifier.

## Features

- **Soil Sensor Data Collection**: Collates soil temperature, humidity, and moisture values from an ESP8266 and soil sensors.
- **Data Visualization**: Displays collected data on a dashboard using an iframe.
- **Satellite Data Retrieval**: Fetches satellite data including UVI Index, soil temperature, and moisture from AgroMonitoring weather API.
- **Plant Disease Detection**: Uses a plant disease classifier to detect plant diseases from leaf images.

## Requirements

- Node.js
- React
- Ubidots account
- AgroMonitoring API key
- TensorFlow.js
- Plant Disease Classifier from [PLANT-DISEASE-CLASSIFIER-WEB-APP-TENSORFLOWJS](https://github.com/rexsimiloluwah/PLANT-DISEASE-CLASSIFIER-WEB-APP-TENSORFLOWJS)

## Installation

1. Clone the repository:

    \`\`\`sh
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    \`\`\`

2. Install the dependencies:

    \`\`\`sh
    npm install
    \`\`\`

3. Set up your environment variables:

    Create a \`.env\` file in the root directory and add the following:

    \`\`\`sh
    REACT_APP_UBIDOTS_API_KEY=your_ubidots_api_key
    REACT_APP_AGROMONITORING_API_KEY=your_agromonitoring_api_key
    \`\`\`

## Running the App

To start the development server:

\`\`\`sh
npm start
\`\`\`

The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Soil Sensor Data**:
   - Connect your ESP8266 and soil sensors.
   - Ensure data is being sent to Ubidots.
   - The app will display the sensor data on the dashboard.

2. **Satellite Data**:
   - The app fetches data from AgroMonitoring and displays it.

3. **Plant Disease Detection**:
   - Navigate to the plant disease detection section.
   - Upload an image of a plant leaf to detect possible diseases using the integrated classifier.

## Demonstration

### Sensor Values Upload

![Sensor Values Upload](media/sensor-values-upload-image.jpg)

### Trigger Alerts

![Trigger Alerts](media/trigger-alerts-image.jpg)

### Dashboard and Disease Detection

[![Dashboard and Disease Detection](media/dashboard-image.jpg)](media/dashboard-video.mp4)

*Click the image above to watch the video demonstration.*

