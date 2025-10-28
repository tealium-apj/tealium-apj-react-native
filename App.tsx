import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, Text } from 'react-native';
import Tealium from 'tealium-react-native';
import {
  TealiumConfig,
  TealiumEvent,
  TealiumEnvironment,
  Dispatchers,
  Collectors,
  ConsentPolicy,
  ConsentStatus,
  LogLevel,
} from 'tealium-react-native/common';

const App = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const config: TealiumConfig = {
      account: 'countryroadgroup',
      profile: 'main',
      environment: TealiumEnvironment.prod,
      collectors: [
        Collectors.AppData,
        Collectors.DeviceData,
        Collectors.Connectivity
      ],
      dispatchers: [Dispatchers.Collect],
      // consentPolicy: ConsentPolicy.gdpr, // Remove this and the payload will send
      visitorServiceEnabled: true,
      useRemoteLibrarySettings: false,       // bypass mobile.html for this test
      loglevel: LogLevel.dev,
    };

    Tealium.initialize(config);
    // Tealium.setConsentStatus(ConsentStatus.consented);
    Tealium.joinTrace('EDzABnvS');
    console.log('Tealium initialized');
  }, []);

  const trackTealiumEvent = () => {
    console.log('Sending Tealium event');
    try {
      let tealEvent = new TealiumEvent(
        'ButtonClicked',
        { button_name: 'SignUp' }
      );
      Tealium.track(tealEvent);
      setResult('Tracked event: ButtonClicked /' + JSON.stringify(tealEvent));
    } catch (e) {
      setResult('Error tracking event');
      console.error('Error tracking Tealium event:', e);
    }
  };

  return (
    <SafeAreaView>
      <Button title="Send Tealium Event" onPress={trackTealiumEvent} />
      <Text>{result}</Text>
    </SafeAreaView>
  );
};

export default App;