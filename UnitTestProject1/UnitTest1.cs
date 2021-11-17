using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;
using System.Threading;
using TestStack.White;
using TestStack.White.UIItems;
using TestStack.White.UIItems.Finders;
using TestStack.White.UIItems.MenuItems;
using TestStack.White.UIItems.WindowItems;
using TestStack.White.UIItems.WindowStripControls;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void Variant1()
        {
            var path = "C:\\Users\\artem\\Desktop\\test.txt";

            // Запускаем и находим окно приложения
            var notepad = Application.Launch("notepad");
            var winMain = notepad.GetWindow("Untitled - Notepad");

            // Находим обласить ввода и вводим текст
            var textArea = winMain.Get<TextBox>(SearchCriteria.ByAutomationId("15"));
            textArea.Text = "Any text with a length of 10-100 characters.";

            // Открываем меню и сохранем
            var menu = winMain.Get<MenuBar>(SearchCriteria.ByAutomationId("MenuBar"));
            var btnSaveAs = menu.MenuItem("File", "Save As...");
            btnSaveAs.Click();

            // Сохраняем указываем указываем путь
            var winSaveFileDialog = winMain.ModalWindow("Save As");
            var tbFileName = winSaveFileDialog.MdiChild(SearchCriteria.ByAutomationId("1001"));
            tbFileName.Enter(path);
            var btnSave = winSaveFileDialog.Get<Button>(SearchCriteria.ByText("Save"));
            btnSave.Click();

            // В случае перезаписи файла
            var winConfirmationDialog = winSaveFileDialog.ModalWindow("Confirm Save As");
            if (winConfirmationDialog != null)
            {
                var btnYes = winConfirmationDialog.Get<Button>(SearchCriteria.ByText("Yes"));
                btnYes.Click();
            }

            // Закрываем
            notepad.Close();

        }

        [TestMethod]
        public void Case1()
        {
            // Запускаем и находим окно приложения
            var calc = Application.Launch("calc");
            var winMain = calc.GetWindow("Calculator");

            // Нажатие на кнопку "1" 4 раза
            var button = winMain.Get<Button>(SearchCriteria.ByText("1"));
            button.Click(); button.Click(); button.Click(); button.Click();

            // Нажатие на кнопку "*"
            var button1 = winMain.Get<Button>(SearchCriteria.ByText("Multiply"));
            button1.Click();

            // Нажатие на кнопку "1" 4 раза
            button.Click(); button.Click(); button.Click(); button.Click();

            // Нажатие на кнопку "="
            var button3 = winMain.Get<Button>(SearchCriteria.ByText("Equals"));
            button3.Click();

            // Получение ответа и преобразование
            var res = winMain.Get<Label>(SearchCriteria.ByAutomationId("150"));
            var response = res.Name.ToString();

            // Закрытие калькулятора
            calc.Close();

            // Проверка
            Assert.AreEqual(response, "1234321");

        }

        [TestMethod]
        public void Case2()
        {
            // Запускаем и находим окно приложения
            var calc = Application.Launch("calc");
            var winMain = calc.GetWindow("Calculator");

            // Нажатие на кнопку "2" 4 раза
            var button = winMain.Get<Button>(SearchCriteria.ByText("2"));
            button.Click(); button.Click(); button.Click(); button.Click();

            // Нажатие на кнопку "*"
            var button1 = winMain.Get<Button>(SearchCriteria.ByText("Subtract"));
            button1.Click();

            // Нажатие на кнопку "1" 4 раза
            var button2 = winMain.Get<Button>(SearchCriteria.ByText("1"));
            button2.Click(); button2.Click(); button2.Click(); button2.Click();

            // Нажатие на кнопку "="
            var button3 = winMain.Get<Button>(SearchCriteria.ByText("Equals"));
            button3.Click();

            // Получение ответа и преобразование
            var res = winMain.Get<Label>(SearchCriteria.ByAutomationId("150"));
            var response = res.Name.ToString();

            // Закрытие калькулятора
            calc.Close();

            // Проверка
            Assert.AreEqual(response, "0");

        }
    }
}
