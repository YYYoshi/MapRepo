using System.Windows;

namespace Map
{
    /// <summary>
    /// MainWindow.xaml の相互作用ロジック
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var context = this.DataContext as MainWindowViewModel;
            if (context == null) { return; }

            // JavaScript の関数を呼び出す。
            this._webBrowser.InvokeScript("moveMap", context.Address);
        }
    }
}
