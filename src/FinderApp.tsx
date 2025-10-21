import React from 'react';
import { useEffect } from 'react';

export const FinderApp = () => {
    useEffect(() => {
        const run = async () => {
            const t = (window as any).TrelloPowerUp.iframe();

            const finder = await (window as any).FrontifyFinder.create({
                clientId: 'client-5jnundpczaaea8ka',
                options: {
                    allowMultiSelect: false,
                    permanentDownloadUrls: true,
                },
            });

            finder.onAssetsChosen(async (assets: any[]) => {
                const selected = assets?.[0];
                if (selected) {
                    await t.attach({
                        url: selected.previewUrl || selected.cdn,
                        name: selected.title || selected.fileName,
                    });
                }
                finder.close();
                t.closeModal();
            });

            finder.onCancel(() => {
                finder.close();
                t.closeModal();
            });

            finder.mount(document.getElementById('finderContainer')!);
        };

        run();
    }, []);

    return <div id="finderContainer" style={{ height: '800px', width: '1200px' }} />;
};
