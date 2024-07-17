export const inviteHbs = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <title>Oogned - Vragenlijst met betrekking tot oogheelkundige klachten</title>
  <style>
    .space-y-2 > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(8px * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(8px * var(--tw-space-y-reverse))
    }
    .space-y-4 > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(16px * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(16px * var(--tw-space-y-reverse))
    }
    .underline {
      text-decoration-line: underline
    }
    .hover-bg-gray-900:hover {
      background-color: #111827 !important
    }
    @media (max-width: 600px) {
      .sm-text-4xl {
        font-size: 36px !important
      }
    }
    @media (prefers-color-scheme: dark) {
      .dark-border-gray-800 {
        border-color: #1f2937 !important
      }
      .dark-bg-gray-100 {
        background-color: #f3f4f6 !important
      }
      .dark-bg-gray-900 {
        background-color: #111827 !important
      }
      .dark-text-gray-400 {
        color: #9ca3af !important
      }
      .dark-hover-bg-gray-100:hover {
        background-color: #f3f4f6 !important
      }
    }
  </style>
</head>
<body style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div style="display: none">
    Vragenlijst met betrekking tot oogheelkundige klachten.
    &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
  </div>
  <div role="article" aria-roledescription="email" aria-label="Oogned - Vragenlijst met betrekking tot oogheelkundige klachten" lang="en">
    <div class="dark-bg-gray-900" style="background-color: #f9fafb; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
      <div style="padding: 48px 16px">
        <div class="space-y-4" style="margin-left: auto; margin-right: auto; display: grid; max-width: 448px; align-items: center; gap: 16px; text-align: center">
          <div class="space-y-2">
            <img alt="Oogned logo" height="64" src="https://oogned.nl/_next/image?url=%2Foogned.png&w=256&q=75" style="max-width: 100%; vertical-align: middle; line-height: 1; margin-left: auto; margin-right: auto">
            <h1 class="sm-text-4xl" style="font-size: 30px; font-weight: 700; letter-spacing: -0.05em; margin-top: calc(8px * calc(1 - 0)); margin-bottom: calc(8px * 0)">Vragenlijst met betrekking tot oogheelkundige klachten</h1>
          </div>
          <div class="space-y-2" style="margin-top: calc(16px * calc(1 - 0)); margin-bottom: calc(16px * 0);">
            <p class="dark-text-gray-400" style="color: #6b7280">
              Geachte heer/mevrouw,
            </p>
            <p class="dark-text-gray-400" style="color: #6b7280; margin-top: calc(8px * calc(1 - 0)); margin-bottom: calc(8px * 0)">
              In samenwerking met uw huisarts zouden we graag van u willen weten wat de klachten zijn waardoor we u zo goed en snel mogelijk kunnen helpen. Vul deze vragenlijst in en de huisarts zal na het invullen van de vragenlijst contact met u opnemen.
            </p>
          </div>
          <div style="margin-top: calc(16px * calc(1 - 0)); margin-bottom: calc(16px * 0);">
            <a class="hover-bg-gray-900 dark-bg-gray-100 dark-hover-bg-gray-100" href="{{url}}" style="display: inline-block; width: 100%; border-radius: 8px; border-width: 1px; border-color: transparent; background-color: #111827; padding: 20px; text-align: center; font-size: 20px; font-weight: 600; line-height: 1; color: #fff; transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms">
              Open de vragenlijst
            </a>
          </div>
          <div class="dark-border-gray-800" style="border-top-width: 1px; border-color: #e5e7eb; margin-top: calc(16px * calc(1 - 0)); margin-bottom: calc(16px * 0)"></div>
          <div class="space-y-2" style="margin-top: calc(16px * calc(1 - 0)); margin-bottom: calc(16px * 0);">
            <p class="dark-text-gray-400" style="font-size: 14px; color: #6b7280">
              Door te klikken op de knop "Open de vragenlijst" opent de vragenlijst in je browser. Als je vragen hebt, neem dan contact met ons op via
              <link class="underline" href="mailto:contact@oogned.nl">contact@oogned.nl of raadpleeg uw huisarts.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
