using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;
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
        public void Case1()
        {
            // Запускаем и находим окно приложения
            var calc = Application.Launch("calc");
            var winMain = calc.GetWindow("Calculator");
            Button button = winMain.Get<Button>(SearchCriteria.ByText("6"));
            button.Click();
            button = winMain.Get<Button>(SearchCriteria.ByText("Add"));
            button.Click();
            button = winMain.Get<Button>(SearchCriteria.ByText("4"));
            button.Click();
            button = winMain.Get<Button>(SearchCriteria.ByText("Equals"));
            button.Click();
            calc.Close();

            //Assert.IsTrue(File.Exists(path));
            //Assert.AreEqual(File.ReadAllText(path), "Any text with a length of 10-100 characters.");
        }

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
            /*
            var winConfirmationDialog = winSaveFileDialog.ModalWindow("Confirm Save As");
            if (winConfirmationDialog != null)
            {
                var btnYes = winConfirmationDialog.Get<Button>(SearchCriteria.ByText("Yes"));
                btnYes.Click();
            }
            */
            // Закрываем и проверяем
            notepad.Close();

            //Assert.IsTrue(File.Exists(path));
            //Assert.AreEqual(File.ReadAllText(path), "Any text with a length of 10-100 characters.");
        }
    }
}
