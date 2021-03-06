require('chai').should();

feature(`Background statement

        Background statements are used to define a common given that is
        applied to each scenario. The background is executed before each scenario
        `, () => {

        let someValue = 0;
        let count = 0;
        let afterBackgroundCheck = 0;

        background("This will be executed before each test", () => {

            afterBackground(() => {
                afterBackgroundCheck = 0;
            });

            given("somevalue = '30'", () => {
                count++;
                someValue = backgroundContext.given.values[0];
            });

            and("we add '70' to somevalue", () => {
                someValue += backgroundContext.and[0].values[0];
            });

            and("the stepContext is available so should get '10' from this step", () => {
                stepContext.values[0].should.be.equal(10);
            })

            and("afterBackgroundCheck has '10' added to it", () => {
                afterBackgroundCheck += 10;
            });

        });

        scenario(`Add 10 to someValue`, () => {
            when(`someValue is increased by '10'`, () => {
                someValue += stepContext.values[0];
            });

            then("someValue should be '110'", () => {
                someValue.should.be.equal(stepContext.values[0]);
            });

            and("afterBackgroundCheck should be '10'", () => {
                afterBackgroundCheck.should.be.equal(stepContext.values[0]);
            });

            // TODO: Change the number to 1 after optimization
            and("the background has been executed '1' times so far", () => {
                count.should.be.equal(stepContext.values[0]);
            })
        });

        scenario("Add 20 to someValue", () => {
            when(`someValue is increased by '20'`, () => {
                someValue += stepContext.values[0];
            });

            then("someValue should be '120'", () => {
                someValue.should.be.equal(stepContext.values[0]);
            });

            and("afterBackgroundCheck should be '10'", () => {
                afterBackgroundCheck.should.be.equal(stepContext.values[0]);
            });


            and("the background has been executed '2' times so far", () => {
                count.should.be.equal(stepContext.values[0]);
            })
        });

        scenario("Add 200 to someValue", () => {
            when(`someValue is increased by '200'`, () => {
                someValue += stepContext.values[0];
            });

            then("someValue should be '300'", () => {
                someValue.should.be.equal(stepContext.values[0]);
            });

            and("afterBackgroundCheck should be '10'", () => {
                afterBackgroundCheck.should.be.equal(stepContext.values[0]);
            });

            and("the background should be executed '3' times", () => {
                stepContext.values[0].should.be.equal(count);
            });
        });

    });



