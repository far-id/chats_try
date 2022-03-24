<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


# Chatting Aplication



## Documentation

[Documentation](#)


## Installation

Install project dengan buka terminal atau cmd dan jalankan command dibawah satu-persatu :

- `git clone https://github.com/farid10243/chats_try.git`
- `cd chats_try`
- `composer install`
- `npm install`

    
## Environment Variables

Sebelum menjalankan aplikasi copy file `.env.example` dan ubah namanya menjadi `.env`.

Jalankan perintah `php artisan key:generate`

Buat database baru. Disini dicontohkan dengan mysql dengan nama database 'chats'
dan konfigurasinya seperti :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chats
DB_USERNAME=root
DB_PASSWORD=
```

Sebelum mengatur konfigurasi pusher di .env file, kamu diminta untuk melakukan lnagkah-langkah berikut :
- Membuat akun di [pusher.com](https://pusher.com/)
- Klik `Get Started` di bagian chanels
- Namai aplikasi sesukamu
- Dibagian cluster pilih `(Singapore)` atau region terdekat dari tempatmu
- Front end pilih `React`
- Back end pilih `Laravel`
- Klik `Create app`

Setelah itu kau akan dipindahkan ke halaman baru. perhatikan di bagian kiri dan pilih menu `App keys`. kemudian kamu akan melihat uniq keys dan masukkan sesuai namanya di file .env

`BROADCAST_DRIVER=pusher`
```
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
```


## Running

Untuk menjalankan aplikasinya, jalankan 2 perintah bersamaan :
- `php artisan serve`
- `npm run dev`


## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
