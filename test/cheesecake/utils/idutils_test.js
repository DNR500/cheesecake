require(
    [
        'cheesecake/utils/idutils'
    ],
    function (IdUtils) {
        'use strict';

        describe("Id Utils", function () {
            var underTestIdGenFun;

            beforeEach(function () {
                underTestIdGenFun = IdUtils.createIdGenerator("test");
            });

            describe("function that creates an Id generator: 'createIdGenerator'", function () {
                it("should return a function", function () {
                    expect(underTestIdGenFun instanceof Function).toBeTruthy();
                });
            });

            describe("function returned from Id generator function: 'createIdGenerator'",
                function () {

                    describe("single generator tests", function () {
                        it("should create an id in the form givenPrefix-baseLabel-index", function () {
                            var result = underTestIdGenFun('prefix');
                            expect(result).toEqual("prefix-test-0");
                        });

                        it("should increment the index when called multiple times", function () {
                            var result = underTestIdGenFun('prefix');
                            var result2 = underTestIdGenFun('prefix');
                            expect(result).toEqual("prefix-test-0");
                            expect(result2).toEqual("prefix-test-1");
                        });

                        it("should use the prefix given if changed and still increment the index",
                            function () {
                                var result = underTestIdGenFun('aPrefix');
                                var result2 = underTestIdGenFun('anotherPrefix');
                                expect(result).toEqual("aPrefix-test-0");
                                expect(result2).toEqual("anotherPrefix-test-1");
                            });
                    });

                    describe("multiple generator tests", function () {
                        var otherGenFun;
                        var resultFromUnderTestFun;
                        var resultFromOtherGenFun;

                        beforeEach(function () {
                            otherGenFun = IdUtils.createIdGenerator('other');
                            resultFromUnderTestFun = underTestIdGenFun('prefix');
                            resultFromOtherGenFun = otherGenFun('aDifferentPrefix');
                        });

                        it("should not interfere with other returned generators", function () {
                            expect(resultFromUnderTestFun).toEqual("prefix-test-0");
                            expect(resultFromOtherGenFun).toEqual("aDifferentPrefix-other-0");
                        });

                        it("should not interfere with other returned generators even when called multiple times",
                            function () {
                                var resultFromUnderTestFun2 = underTestIdGenFun('prefix');
                                var resultFromUnderTestFun3 = underTestIdGenFun('prefix');
                                var resultFromOtherGenFun2 = otherGenFun('aDifferentPrefix');

                                expect(resultFromUnderTestFun).toEqual("prefix-test-0");
                                expect(resultFromUnderTestFun2).toEqual("prefix-test-1");
                                expect(resultFromUnderTestFun3).toEqual("prefix-test-2");

                                expect(resultFromOtherGenFun).toEqual("aDifferentPrefix-other-0");
                                expect(resultFromOtherGenFun2).toEqual("aDifferentPrefix-other-1");
                            });
                    });
                });
        });
    }
);