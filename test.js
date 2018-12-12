const assert = require('assert');
const {
    JSDOM
} = require('jsdom');

before(async function () {
    await JSDOM.fromFile("index.html").then(dom => {
        const {
            window
        } = dom;

        function copyProps(src, target) {
            const props = Object.getOwnPropertyNames(src)
                .filter(prop => typeof target[prop] === 'undefined')
                .reduce((result, prop) => ({
                    ...result,
                    [prop]: Object.getOwnPropertyDescriptor(src, prop),
                }), {});
            Object.defineProperties(target, props);
        }

        global.window = window;
        global.document = window.document;
        global.navigator = {
            userAgent: 'node.js',
        };
        copyProps(window, global);
    });;
});

describe('Учет сельскохозяйственной техники', () => {
    describe('Тестирование формы', function () {
        it('Кнопка "Оменить изменения" должна быть неактивной при запуске приложения', function () {
            const btnCancelChange = global.document.getElementById('btnCancelChange');
            assert.equal(btnCancelChange.disabled, true);
        });

        it('Поле ввода для сортировки техники по категории должно очищаться при нажатии на кнопку "Сбросить"', function () {
            const searchCategory = global.document.getElementById('searchCategory');
            const resetCategory = global.document.getElementById('resetCategory');
            searchCategory.value = "test text";
            resetCategory.click();
            setTimeout(() => assert.equal(searchCategory.value, ""), 1000);
        });

        it('Поле ввода для сортировки техники по модели должно очищаться при нажатии на кнопку "Сбросить"', function () {
            const searchModel = global.document.getElementById('searchModel');
            const resetModel = global.document.getElementById('resetModel');
            searchModel.value = "test text";
            resetModel.click();
            setTimeout(() => assert.equal(searchModel.value, ""), 1000);
        });

        it('Все поля ввода на форме должны очищаться при нажатии на кнопку "Сбросить"', function () {
            const inputCategory = global.document.getElementById('category');
            const inputModel = global.document.getElementById('model');
            const inputWeight = global.document.getElementById('weight');
            const inputLength = global.document.getElementById('length');
            const inputWidth = global.document.getElementById('width');
            const inputHeight = global.document.getElementById('height');
            const inputDateOfManufacture = global.document.getElementById('dateOfManufacture');
            const inputCost = global.document.getElementById('cost');
            inputCategory.value = "test text";
            inputModel.value = "test text";
            inputWeight.value = "test text";
            inputLength.value = "test text";
            inputWidth.value = "test text";
            inputHeight.value = "test text";
            inputDateOfManufacture.value = "test text";
            inputCost.value = "test text";
            resetForm.click();
            setTimeout(() => assert.equal(inputCategory.value, ""), 1000);
            setTimeout(() => assert.equal(inputModel.value, ""), 1000);
            setTimeout(() => assert.equal(inputWeight.value, ""), 1000)
            setTimeout(() => assert.equal(inputLength.value, ""), 1000)
            setTimeout(() => assert.equal(inputWidth.value, ""), 1000)
            setTimeout(() => assert.equal(inputHeight.value, ""), 1000)
            setTimeout(() => assert.equal(inputDateOfManufacture.value, ""), 1000)
            setTimeout(() => assert.equal(inputCost.value, ""), 1000)
        });
    });

});