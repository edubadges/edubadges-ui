<script>
  import { Tabs, TabList, TabPanel, Tab } from '../tabs/tabs.js';

  export let errorEnglish;
  export let errorDutch;

</script>


<Tabs>
	<TabList>
		<Tab error={errorEnglish}>English</Tab>
		<Tab error={errorDutch}>Dutch</Tab>
	</TabList>

	<TabPanel >
		<slot name='en'></slot>
	</TabPanel>

	<TabPanel>
		<slot name='nl'></slot>
	</TabPanel>

</Tabs>

