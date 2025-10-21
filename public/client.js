TrelloPowerUp.initialize({
    'card-buttons': function (t) {
      return [
        {
          text: 'Attach from Frontify',
          icon: 'https://media.ffycdn.net/eu/demo/43L2Li7yr59XJTunCL2w.svg',
          callback: function (t) {
            return t.modal({
              url: 'finder.html',
              accentColor: '#cbbbfb',
              title: 'Select an Asset from Frontify test',
              fullscreen: true,
            });
          },
        },
      ];
    },
   'save-attachment': function (t, options) {
    return {
      name: 'Save to Frontify (test)',
      callback: async function (t, opts) {
        // 1) See exactly what Trello sent
        console.log('[SaveAttachment] options:', options);
        console.log('[SaveAttachment] opts:', opts);

        // 2) Preferred: read the attachment off opts or options
        const att = opts?.attachment || options?.attachment;

        if (att) {
          console.log('[SaveAttachment] attachment object:', att);
          console.log('[SaveAttachment] URL:', att.url);
          console.log('[SaveAttachment] Name:', att.name);
          console.log('[SaveAttachment] Bytes:', att.bytes);
          console.log('[SaveAttachment] MimeType:', att.mimeType);
          t.alert({ message: 'Got attachment ✅ (check console)', duration: 4 });
          return;
        }

        // 3) Fallback: log ALL attachments on the card
        const card = await t.card('id', 'name', 'attachments');
        console.warn('[SaveAttachment] No attachment provided. Fallback — all card attachments:', card.attachments);
        t.alert({ message: 'No attachment provided; logged all card attachments', duration: 5 });
      },
    };
  },
  });
  