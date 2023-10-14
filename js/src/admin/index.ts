import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import ExtensionPageWithClearCache from './components/ExtensionPageWithClearCache';

app.initializers.add('clarkwinkelmann-selective-mediaembed', () => {
    app.extensionData
        .for('clarkwinkelmann-selective-mediaembed')
        .registerPage(ExtensionPageWithClearCache)
        .registerSetting(function (this: ExtensionPageWithClearCache) {
            const setting = this.setting('clarkwinkelmann-selective-mediaembed.enabledSites');

            let siteIds: string[];

            try {
                siteIds = JSON.parse(setting());
            } catch (error) {
                // silence any error
            }

            // @ts-ignore "used before assigned"
            if (!Array.isArray(siteIds)) {
                siteIds = [];
            }

            return [
                m('.Form-group', [
                    Button.component({
                        className: 'Button',
                        onclick: () => {
                            setting(JSON.stringify((app.data.mediaEmbedSites as any).map((site: any) => site.id)));
                        },
                    }, app.translator.trans('clarkwinkelmann-selective-mediaembed.admin.selectAll')),
                    ' ',
                    Button.component({
                        className: 'Button',
                        onclick: () => {
                            setting('[]');
                        },
                    }, app.translator.trans('clarkwinkelmann-selective-mediaembed.admin.unselectAll')),
                ]),
                (app.data.mediaEmbedSites as any || []).map((site: any) => m('.Form-group', [
                    Switch.component({
                        state: siteIds.indexOf(site.id) !== -1,
                        onchange: (enabled: boolean) => {
                            const i = siteIds.indexOf(site.id);

                            // Shouldn't happen, but in case the new state is same as current state, ignore
                            if (enabled === (i !== -1)) {
                                return;
                            }

                            if (enabled) {
                                siteIds.push(site.id);
                            } else {
                                siteIds.splice(i, 1);
                            }

                            setting(JSON.stringify(siteIds));
                        },
                    }, [
                        m('span.mediaembed-site-name', site.name || 'N/A'),
                        site.example ? m('pre.mediaembed-site-example', Array.isArray(site.example) ? site.example.join('\n') : site.example) : null,
                    ]),
                ])),
            ];
        });
});
