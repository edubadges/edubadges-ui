<script>
  import { Tabs, TabList, TabPanel, Tab } from '../tabs/tabs.js';
</script>


<Tabs>
	<TabList>
		<Tab>English</Tab>
		<Tab>Dutch</Tab>
	</TabList>

	<TabPanel>
		<slot name='en'></slot>
	</TabPanel>

	<TabPanel>
		<slot name='nl'></slot>
	</TabPanel>

</Tabs>

