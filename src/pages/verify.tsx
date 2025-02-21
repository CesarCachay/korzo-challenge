import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { VerifyView } from 'src/sections/verify/verify-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Verify users - ${CONFIG.appName}`}</title>
      </Helmet>

      <VerifyView />
    </>
  );
}
