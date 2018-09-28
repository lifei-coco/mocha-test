describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        add(1, 1).should.be.eql(2);
    });

    it('任何数加0等于自身', function() {
        add(1, 0).should.be.eql(1);
        add(0, 0).should.be.eql(0);
    });

    it('任何数加数字字符串等于数字相加', function() {
        add(1, '1').should.be.eql(2);
    });

    it('数字字符串加数字等于数字相加', function() {
        add('1', 1).should.be.eql(2);
    });

    it('任何数加普通字符串等于任何数加0', function() {
        add(1, 'a').should.be.eql(1);
    });

    it('普通字符串加数字等于0加任何数', function() {
        add('a', 1).should.be.eql(1);
    });
});