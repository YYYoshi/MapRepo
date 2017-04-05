using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Windows.Input;

namespace Map
{
    class MainWindowViewModel : BindableBase
    {
        public MainWindowViewModel()
        {
        }

        private string _uri = String.Format("file://{0}GeoJsonLoad.html", AppDomain.CurrentDomain.BaseDirectory);
        public string Uri
        {
            get { return _uri; }

        }

        private string address;
        /// <summary>
        /// Google Map に指定する住所を取得または設定します。
        /// </summary>
        public string Address
        {
            get
            {
                return address;
            }
            set
            {
                SetProperty(ref address, value);
            }
        }
        public ICommand GoCommand
        {
            get
            {
                return new DelegateCommand(MoveMap);
            }
        }

        private void MoveMap()
        {
            // JavaScript の関数を呼び出す。
            //this._webBrowser.InvokeScript("moveMap", Address);
        }


        private string mapHost;
        /// <summary>
        /// Google Map に指定する住所を取得または設定します。
        /// </summary>
        public string MapHost
        {
            get
            {
                return mapHost;
            }
            set
            {
                SetProperty(ref mapHost, value);
            }
        }
    }
}
