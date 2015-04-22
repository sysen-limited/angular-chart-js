describe('Test example', function() {
    beforeEach(module('example'));

    describe('the service', function() {
        it('should welcome you', inject(function(serviceExample) {
            expect(serviceExample.getWelcome()).toBe("Hello World!");
        }));
    });
});
