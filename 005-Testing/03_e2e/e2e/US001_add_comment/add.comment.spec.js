describe('homepage', function () {

    beforeEach(function () {
        browser.get('/#/topics/1');
    });

    it('should send a comment', function () {

        var numberOfComment = 0;
        element.all(by.repeater('comment in tc.listComments'))
            .count()
            .then(function (count) {
                numberOfComment = count;
                console.log(numberOfComment);
            });

        element(by.model('tc.newComment.login')).sendKeys("kevin");
        element(by.model('tc.newComment.text')).sendKeys("comment");
        element(by.buttonText('Send')).click();

        /*console.log(element.all(by.repeater('comment in tc.listComments')).count());*/
        element.all(by.repeater('comment in tc.listComments'))
            .count()
            .then(function (count) {
                expect(count).toBeGreaterThan(numberOfComment);
            })

    });

    it('should avoid submit', function () {
        element(by.model('tc.newComment.login')).sendKeys("k");
        element(by.model('tc.newComment.text')).sendKeys("aaaaaa");
        element(by.css('.container')).click();
        expect(element(by.buttonText('Send')).isEnabled()).toBeFalsy();
    });
});
