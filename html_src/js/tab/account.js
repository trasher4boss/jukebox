/* global Tab, Class */

this.AccountTab = Class.create(Tab, {
    initialize: function(rootCSS, jukebox, template) {
        this.name = "Account";
        this.nickname = null;
        this.token = null;
        this.sid = null;
        this.home = null;
        this.userAgent = null;
        this.userIp = null;
        this.rootCSS = rootCSS;
        this.jukebox = jukebox;
        this.template = template;
        this.jukebox.getUserAccountInformations();
    },

    treatResponse: function(resp) {
        this.nickname = resp.nickname;
        this.token = resp.token;
        this.sid = resp.sid;
        this.home = resp.home;
        this.userAgent = resp.user_agent;
        this.userIp = resp.ip;
        this.updateContent(this.DOM);
    },

    sendChangePasswordRequest: function() {
        Notifications.Display(Notifications.LEVELS["info"], "Change password request");
        var old_password = this.DOM.down('.' + this.rootCSS + '-account-old-password').value,
            new_password = this.DOM.down('.' + this.rootCSS + '-account-new-password').value,
            new_password2 = this.DOM.down('.' + this.rootCSS + '-account-new-password2').value;
        if (new_password == new_password2) {
            this.jukebox.sendChangePasswordRequest(this.nickname, old_password, new_password, new_password2);
        } else {
            Notifications.Display(Notifications.LEVELS["error"], "The passwords you typed do not match");
        }
    },

    updateContent: function(DOM) {
        if (this.nickname == null) {
            this.DOM = DOM;
            this.DOM.update("Wait until you receive account informations");
        } else {
            var accountTpl = new Template(this.template.main),
                accountTplVars = {
                    root: this.rootCSS,
                    user: this.nickname,
                    token: this.token,
                    sid: this.sid,
                    home: this.home,
                    userAgent: this.userAgent,
                    ip: this.userIp
                },
                account_form = accountTpl.evaluate(accountTplVars);

            this.DOM = DOM;
            this.DOM.update(account_form);
            var submit_button = this.DOM.down('.' + this.rootCSS + '-account-change-password-submit');
            submit_button.on("click", this.sendChangePasswordRequest.bind(this));
        }
    }
});
