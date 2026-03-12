/// <reference path="./.sst/platform/config.d.ts" />

// Suppress AWS SDK warning when both profile and static keys are set
// by prioritizing the profile (which is the project standard)
if (
  process.env.AWS_PROFILE &&
  (process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SECRET_ACCESS_KEY)
) {
  delete process.env.AWS_ACCESS_KEY_ID;
  delete process.env.AWS_SECRET_ACCESS_KEY;
}

export default $config({
  app(input) {
    return {
      name: 'aiready-clawmore',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const isProd = $app.stage === 'production';
    const domainName = isProd
      ? 'clawmore.getaiready.dev'
      : `${$app.stage}.clawmore.getaiready.dev`;

    const site = new sst.aws.Nextjs('ClawMoreSite', {
      path: '.',
      domain: {
        name: domainName,
        dns: sst.cloudflare.dns({
          zone: '50eb7dcadc84c58ab34583742db0b671',
        }),
      },
      environment: {
        NEXT_PUBLIC_APP_URL: `https://${domainName}`,
      },
    });

    return {
      site: site.url,
      domain: domainName,
    };
  },
});
