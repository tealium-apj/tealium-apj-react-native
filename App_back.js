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
  ConsentStatus
} from 'tealium-react-native/common';

const App = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const config: TealiumConfig ={
      account: 'success-ryunosuke-senda',
      profile: 'mobile-test',
      environment: TealiumEnvironment.dev,
      instance: 'main',
      collectors: [
        Collectors.AppData,
        Collectors.DeviceData,
        Collectors.Connectivity
      ],
      dispatchers: [Dispatchers.Collect, Dispatchers.TagManagement],
      consentPolicy: ConsentPolicy.gdpr,
      visitorServiceEnabled: true,
      logLevel: 'prod',
    };

    Tealium.initialize(config);
    Tealium.setConsentStatus(ConsentStatus.consented);
    console.log('✅ Tealium initialized');
  }, []);

  const trackTealiumEvent = () => {
    console.log('📡 Sending Tealium event');
    try {
      let tealEvent = new TealiumEvent(
        'ButtonClicked',
        { button_name: 'SignUp' }
      );
      Tealium.track(tealEvent);
      setResult('Tracked event: ButtonClicked');
    } catch (e) {
      setResult('Error tracking event');
      console.error('❌ Error tracking Tealium event:', e);
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