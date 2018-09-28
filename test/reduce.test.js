describe('减法函数的测试', function() {
    it('1 减 1 应该等于 0', function() {
        reduce(1, 1).should.be.eql(0);
    });

    it('任何数减0等于自身', function() {
        reduce(1, 0).should.be.eql(1);
        reduce(0, 0).should.be.eql(0);
    });

    it('数字减数字字符串等于数字相减', function() {
        reduce(1, '1').should.be.eql(0);
    });

    it('数字字符串加数字等于数字相减', function() {
        reduce('1', 1).should.be.eql(0);
    });

    it('任何数减普通字符串等于任何数减0', function() {
        reduce(1, 'a').should.be.eql(1);
    });

    it('普通字符串减数字等于0减任何数', function() {
        reduce('a', 1).should.be.eql(-1);
    });
});