import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingModal from 'flarum/admin/components/LoadingModal';

export default class ExtensionPageWithClearCache extends ExtensionPage {
    content(vnode: any): any {
        const vdom = super.content(vnode) as any;

        vdom.children[0].children[0].children.push(m('.Form-group', m('.Alert', [
            app.translator.trans('clarkwinkelmann-selective-mediaembed.admin.mustClearCache'),
            ' ',
            Button.component({
                className: 'Button',
                onclick() {
                    app.modal.show(LoadingModal);

                    // Same code as in core's StatusWidget
                    app.request({
                        method: 'DELETE',
                        url: app.forum.attribute('apiUrl') + '/cache',
                    }).then(() => window.location.reload());
                },
            }, app.translator.trans('clarkwinkelmann-selective-mediaembed.admin.clearCache')),
        ])));

        return vdom;
    }
}
