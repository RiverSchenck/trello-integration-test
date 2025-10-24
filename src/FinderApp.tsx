import React from 'react';
import { useEffect, useState } from 'react';

export const FinderApp = () => {
    const [urlType, setUrlType] = useState<'previewUrl' | 'dynamicUrl'>('previewUrl');

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
                    console.log(selected)
                    const url = urlType === 'previewUrl'
                        ? selected.previewUrl || selected.cdn
                        : selected.dynamicUrl || selected.cdn;

                    await t.attach({
                        url: url,
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

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    URL Type:
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="radio"
                            name="urlType"
                            value="previewUrl"
                            checked={urlType === 'previewUrl'}
                            onChange={(e) => setUrlType(e.target.value as 'previewUrl' | 'dynamicUrl')}
                        />
                        Preview URL
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="radio"
                            name="urlType"
                            value="dynamicUrl"
                            checked={urlType === 'dynamicUrl'}
                            onChange={(e) => setUrlType(e.target.value as 'previewUrl' | 'dynamicUrl')}
                        />
                        Dynamic URL
                    </label>
                </div>
            </div>
            <div id="finderContainer" style={{ height: '800px', width: '1200px' }} />
        </div>
    );
};
