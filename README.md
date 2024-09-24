Gereksinimler
1- Docker Desktop
2- Önerilen 8GB Ram
3- Önerilen en az boş 5GB depolama alanı

Uygulamayı Nasıl Çalıştırırım ?
1- Docker desktopu açınız. Eğer docker kurulumunuz yoksa "https://www.docker.com/" adresinden dockerı bilgisayarınıza kurunuz. Ve Docker desktopu açınız.
2- Terminali açınıız ve proje dizinine gidiniz.
3- "docker-compose up --build" çalıştırın. (yaklaşık 5 dakika sürecektir)
4- Proje ayağa kalktıktan sonra "http://localhost:3000/" adresine gidebilirsiniz.

Uygulama Nasıl Kullanılır ?
![alt text](image.png)
uygulama ilk açıldığında yukarıdaki ekran sizi karşılayacaktır.

Burada uçuşları göster butonuna basmadan önce kalkış ve iniş noktalarının seçili olduğundan emin olunması gerekmektedir.

One Way Trip
![alt text](image-1.png)
Yukarıda örnek bir One Way Trip aramasını görmektesiniz. Burada kalkış Amsterdam havalimanı ve Tenerife Sur Reina Sofia ya iniş yapacağını ve bu uçuşun 09/24/2024 tarihine olacağını kalkış saatine göre sıralayarak gösterioruz.

Book flight butonuna bastığımızda ilk rezervasyonumuzu yapmış oluyoruz.
![alt text](image-2.png)
Bu bizi uçuşlarım sayfasına yönlendiriyor ve uçuşu mongo dbye kaydediyor.

Round Trip nasıl kullanılır ?
![alt text](image-3.png)
Yukarıda round trip seçili bir aramanın nasıl olduğunu görüyorsunuz.
1- İlk olarak gidiş için bir uçuş seçmeliyiz.
![alt text](image-4.png)
İlk uçuşumuz seçildikten sonra dönüş için dönüş tarihine göre filtrelenmiş uçaklar karşımıza geliyor.
2- Buradan bir uçuşu seçmemiz gerekmektedir.
![alt text](image-5.png)
3- İkinci seçim yapıldıktan sonra uçuşlar listesinin üzerinde yukarıdaki resimde size gösterdiğim sekmeyi göreceksinzi.
4- Bu sekmedeki Book Flight butonuna basıldığında uçuşunuz rezerve edilecek ve uçuşlarım sekmesinden takip edilebilir bir hale gelecektir.

Kullanılan teknolojiler hakkında
1- Docker uygulamanın derlenip kolay çalıştırılması için kullanılmakradır.
2- Dockerda 3 tane nodejs server çalışmaktadır.
a- Proxy service
Bu serverın eklenmesindeki amaç schiphol serverlara direk reacttan istek gönderdiğimizde CORS hatası ile karşılaşmamız.
Bunun için en mantıklı çözüm bir proxy serverdı.
b- Iata service
Iata server olak adlandırdığım bu server bize uçakların rotasyonlarını seçmemizde yardımcı oluyor.
schipol apida destination api rota seçimlerini destekleyecek esneklikte değil ve hızlı metin aramayı desteklememektedir. Bunun için bu server frontend ve elastik search arasındaki bağlantıyı kurmaktadır.
c- Booking service
Bu servis bizim rezervasyonları mongodbye kaydetmemizi sağlayan servistir.
3- Elastik search yukarıda bahsettiğim gibi rotasyon seçiminde hızlı havalimanı ve şehir arama seçenekleri için kullanılmaktadır.
4- MongoDB rezervasyonların saklandığı databasedir.
5- React uygulamanın frontendi için kullanılmıştır.
a- Webpack uygulamanın build edilip kontrol aşamasında daha hızlı bir uı sunmak için eklenmiştir.
b- Scss kod kalitesini arttırmak için eklenmiştir.
c- State management için Redux kullanılmıştır.
d- Routing işlemleri için history kütüphanesi kullanılmıştır.
e- Material UI bir çok icon ve sağladığı componentler için kullanılmıştır.
f- Typesctipt tip tanımlamarı eklenerek kod okunabilirliği arttırlamsı amaçlanmıştır.
g- Axios ile nodejs serverlara API istekleri atılmıştır.
h- React-resizable kullanılarak popupları daha etkin kullanılması sağlanmıştır.
i- Uçuş listelerinde pagination kullanılmıştır. Eğer seçilen güzargahta ve tarihte 20 den fazla uçuş varsa sayfa aşağı indirildikçe 20 20 olmak üzere yavaş yavaş yüklenmektedir.
j- Uçuş listesi ve rezervasyon yapılan uçuşlarım ekranında liste sanallaştırma kullanılmaktadır. Bu yüzden binlerce ve daha fazla uçuş listelenmek istense bile DOM bir sorun çıkartmayacaktır ve performansımız düşmeyecektir.
