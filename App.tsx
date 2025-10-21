import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, Text} from 'react-native';
import Tealium from 'tealium-react-native';
import {
  TealiumConfig,
  TealiumEvent,
  TealiumEnvironment,
  Dispatchers,
  Collectors,
  ConsentPolicy,
  ConsentStatus,
} from 'tealium-react-native/common';

const App = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const config: TealiumConfig = {
      account: 'success-ramin-hafezi',
      profile: 'main',
      environment: TealiumEnvironment.prod,
      collectors: [
        Collectors.AppData,
        Collectors.DeviceData,
        Collectors.Connectivity,
      ],
      dispatchers: [Dispatchers.Collect, Dispatchers.TagManagement],
      consentPolicy: ConsentPolicy.gdpr, // Remove this and the payload will send
      visitorServiceEnabled: true,
    };

    Tealium.initialize(config);
    Tealium.joinTrace('PjiWBxzv');
    console.log('Tealium initialized');
  }, []);

  const trackTealiumEvent = () => {
    console.log('Sending Tealium event');
    try {
      let tealEvent = new TealiumEvent('ButtonClicked', {
        button_name: 'SignUp',
      });
      Tealium.setConsentStatus(ConsentStatus.consented); // Remove this as well if you're not using consent
      Tealium.track(tealEvent);
      // Tealium.getConsentStatus(status => {
      //   setResult('Tracked event: ButtonClicked /' + status);
      // });
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