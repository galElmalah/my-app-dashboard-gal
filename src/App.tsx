import { useEffect, useState } from 'react'
import { Page, Button, Table, TableColumn } from '@wix/design-system';

type Subscriber = {
  email: string;
  subscriptionStatus: string;
  deliverabilityStatus: string;
  createdDate: string;
  updatedDate: string;
};

function App() {
  const instance = new URLSearchParams(window.location.search).get('instance');
  const { instanceId } = JSON.parse(atob(instance?.split('.')[1] || '') || '{}');

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const columns: TableColumn<Subscriber>[] = [
    {
      title: 'Email',
      width: '40%',
      render: (row) => row.email,
    },
    {
      title: 'Status',
      width: '20%',
      render: (row) => row.subscriptionStatus,
    },
    {
      title: 'Validity',
      width: '20%',
      render: (row) => row.deliverabilityStatus,
    },
    {
      title: 'Subscribe Date',
      width: '20%',
      render: (row) => row.createdDate,
    },
  ];

  useEffect(() => {
    const getSubscribers = async () => {
      const subscribersResponse = await fetch(`https://my-app-backend-br8l.onrender.com/subscriptions?instanceId=${instanceId}`).then(res => res.json());

      console.log("SUB RES", subscribersResponse);
    };

    getSubscribers();
  }, []);

  return (
    <Page>
      <Page.Header
        title="Subscribers"
        actionsBar={
          <Button>Update</Button>
        }
      />
      <Page.Content>
        <Table
          data={subscribers}
          columns={columns}
        >
          <Table.Content />
        </Table>
      </Page.Content>
    </Page>
  )
}

export default App
