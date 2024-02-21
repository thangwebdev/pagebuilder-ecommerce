
text/x-generic cron.php ( PHP script, UTF-8 Unicode text )
<?php
  // error_reporting(0);

  @include "config/sql.php";
  // lô 
  // exit;
  $phut = (int) date("i");
  // if($phut == 0 || isset($_GET['db'])) {
  //   file_get_contents("https://api.telegram.org/bot5126596014:AAHxnqbqBOf5X80bg2KEzF2wMyEKPTmBf-I/sendMessage?chat_id=-4018114045&text=cron_run_ok_".date("d-m-Y H:i:s")); 
  // }
  file_get_contents("https://api.telegram.org/bot5126596014:AAHxnqbqBOf5X80bg2KEzF2wMyEKPTmBf-I/sendMessage?chat_id=-4018114045&text=cron_run_ok_".date("d-m-Y H:i:s")); 
  // exit;

  dongbo_donhang();
  function dongbo_donhang(){
    $accessToken = kiot_gettoken();
    $retailer = "duocphamthienthuy"; 
    if($accessToken == 1) {
      echo "=> Lỗi lấy accessToken, đồng bộ không thành công!";
      file_get_contents("https://api.telegram.org/bot5126596014:AAHxnqbqBOf5X80bg2KEzF2wMyEKPTmBf-I/sendMessage?chat_id=-4018114045&text=loi lay token ->dongbo_donhang...".date("d-m-Y H:i:s")); 
      exit;
    }
    $currentTimestamp = time() - 180;
    $currentTimestamp_end = time() - 3600;

    // duyet don hang
    $_order = DB_que("SELECT * FROM `#_order` WHERE is_kiot = 0 AND (kiot_dagui = 0 OR (kiot_timegui <= $currentTimestamp AND kiot_timegui >= $currentTimestamp_end) )  ");
    $_order = DB_arr($_order);
    if(!count($_order)) return;

    $khuvuc = LAY_khuvuc();

    foreach ($_order as $ro) {

      $ngaydat = $ro['ngaydat'];
      $gia_km = $ro['gia_km'];
      $phi_ship = $ro['phi_ship'];
      $ma_giam_gia = $ro['ma_giam_gia'];

      $hoten = $ro['hoten'];
      $sodienthoai = $ro['sodienthoai'];
      $email = $ro['email'];
      $diachi = $ro['diachi'];
      $ghichu = $ro['ghichu'];

      $is_nhan = $ro['is_nhan']; // co xuat hd
      $hoten_xhd = $ro['hoten_nhan'];
      $mst_xhd = $ro['email_nhan'];
      $diachi_xhd = $ro['diachi_nhan'];

      $text_xhd = "";
      if($is_nhan) {
        $text_xhd = ". Có xuất hóa đơn. Tên: $hoten_xhd -> MST: $mst_xhd -> Địa chỉ: $diachi_xhd";
      }


      $idsp = $ro['idsp']; // 1421,1420
      $soluong = $ro['soluong']; // 16,20
      $dongia = $ro['dongia']; // 85000,24000
      $is_key = $ro['is_key'];

      $thanhtoan = $ro['thanhtoan'];
      $thanh_pho = $ro['thanh_pho'];
      $quan_huyen = $ro['quan_huyen'];
      $phuong_xa = $ro['phuong_xa'];
      $nv_kiot = $ro['nv_kiot'];

      // check nhan vien kiot
      $check_nv = DB_que("SELECT * FROM `#_members` WHERE `phanquyen` <> 0 AND id_facebook = '$nv_kiot' LIMIT 1");
      if(!DB_num($check_nv)) {
        $check_nv = DB_que("SELECT * FROM `#_members` WHERE showhi = 1 AND `phanquyen` <> 0 AND id_google = 1 ORDER BY RAND() LIMIT 1");
        $check_nv = DB_arr($check_nv, 1);
        $nv_kiot = $check_nv['id_facebook'];
        // update nguoc vao don hang
        DB_que("UPDATE `#_order` SET nv_kiot = '$nv_kiot' WHERE id = '".$ro['id']."' LIMIT 1");
        //
      }
      // 


      $full_diachi = "";
      $phuongxa = "";
      if($ro['thanh_pho'] != 0){ 
        $full_diachi = SHOW_text($khuvuc[$ro['thanh_pho']]['tenbaiviet_vi']);
        $full_diachi = SHOW_text($khuvuc[$ro['quan_huyen']]['tenbaiviet_vi']).", ".$full_diachi;
        $full_diachi = SHOW_text($khuvuc[$ro['phuong_xa']]['tenbaiviet_vi']).", ".$full_diachi;
        $phuongxa = SHOW_text($khuvuc[$ro['quan_huyen']]['tenbaiviet_vi']);
      }


      $pthucthanhtoan = DB_fet("*","#_phuongthucthanhtoan","`id` = '".$thanhtoan."'","`catasort` DESC",1,"arr");
      $ten_phuongthucthanhtoan = "";
      $tien_gian_tt = 0;
      $tongtien = 0;

      // row sp
      $idSanphams = explode(',', $idsp);
      $soluongs    = explode(',', $soluong);
      $dongias   = explode(',', $dongia);
      $is_key     = explode('|', $is_key);

      $i = 0;
      $orderData = array();
      foreach ($idSanphams as $value) {
        $sanpham   = DB_fet("*", "#_baiviet", "`id` = '".$value."'", "", 1);
        $sanpham   = DB_arr($sanpham, 1);
        $dongia    = $dongias[$i];

        $thanhtien = $soluongs[$i] * $dongia;
        $tongtien += $thanhtien;

        $orderData[] = array(
          "productId" => $sanpham['id_kiot'],
          "productCode" => $sanpham['p1'],
          "productName" => $sanpham['tenbaiviet_vi'],
          "isMaster" => true,
          "quantity" => $soluongs[$i],
          "price" => $dongia,
          "discount" => 0,
          "note" => ""
        );
        $i++;
      }

      if(count($pthucthanhtoan)) {
        $ten_phuongthucthanhtoan = $pthucthanhtoan[0]['tenbaiviet_vi']." (".$pthucthanhtoan[0]['mota_vi'].")";
        $tien_gian_tt = (int) $pthucthanhtoan[0]['tien_giam'];
        if($tien_gian_tt > 0 && $tien_gian_tt <= 100) {
            $tien_gian_tt = $tongtien * $tien_gian_tt / 100;
        }
        else if($tien_gian_tt >= 1000) {
            $tien_gian_tt = $tien_gian_tt;
        }
      }

      $tongitne = $tongtien + $phi_ship - $gia_km - $tien_gian_tt;
      $tongitne = $tongitne > 0 ? $tongitne : 0;
      $last_giamgia = $gia_km - $tien_gian_tt;

      $ngaydat_cv = date("Y-m-d H:i:s", $ngaydat);
      $ngaydat_giao = date("Y-m-d H:i:s", time() + 3600);

      if($ma_giam_gia != "") {
        $ten_phuongthucthanhtoan = "Mã giảm giá: $ma_giam_gia => ".number_format($gia_km) . " | ".$ten_phuongthucthanhtoan;
      }

      // $timestamp = strtotime($dateString);
      
      $customer = array(
        // "id" => 1000,
        "code" => "",
        "name" => $hoten,
        "gender" => true,
        "birthDate" => "1990-01-01T00:00:00",
        "contactNumber" => $sodienthoai,
        "address" => $diachi.", ".$full_diachi,
        "wardName" => $phuongxa,
        "email" => $email,
        "comments" => $ghichu.$text_xhd
      );

      $surchages[] = array(
        // "id" => 1,
        "code" => "",
        "price" => 0
      );
      $payments[] = array(
        "Method" => "",
        "MethodStr" => "",
        "Amount" => 0,
        "Id" => -1,
        "AccountId" => null,
        "VoucherId" => 0,
        "VoucherCampaignId" => 0
      ); 
      //

      //
      $orderData = array(
          // "id" => 123455,
          // "code"=> "madh0001",
          "isApplyVoucher" => false, //Có apply voucher khi tạo đặt hàng không
          "purchaseDate" => $ngaydat_cv, // ngay mua
          "branchId" => 46650, // id chi nhanh
          "soldById" => !empty($nv_kiot) ? (int) $nv_kiot : 99391, // id nhan vien
          // "cashierId" => 0, // id thu ngan
          "discount" => 0, // giam gia
          "description" => $ro['id']." - KHONG XOA", // ghi chu
          "method" => $ten_phuongthucthanhtoan, // phuong thuc dat hang
          "totalPayment" => 0, // khách tra
          "total" => $tongitne, // tong tien

          "discountRatio" => 0, // Giảm giá trên đơn theo %
          "discount" => $last_giamgia, // Giảm giá trên đơn theo tiền
          "status" => 0, // trạng thái đơn đặt hàng

          // "accountId" => 0,
          "makeInvoice" => true,
          "saleChannelId" => 0,
          "orderDetails" => $orderData,
          "orderDelivery" => [
              "deliveryCode" => "",
              "type" => 0,
              "price" => 0,
              "receiver" => $hoten,
              "contactNumber" => $sodienthoai,
              "address" => $diachi.", ".$full_diachi,
              // "locationId" => 10,
              "locationName" => $diachi.", ".$full_diachi,
              "wardName" => $phuongxa,
              "weight" => 0,
              "length" => 0,
              "width" => 0,
              "height" => 0,
              "partnerDeliveryId" => 0,
              "expectedDelivery" => $ngaydat_giao, // giao hang du kien
              "partnerDelivery" => [
                  "code" => "",
                  "name" => $hoten,
                  "address" => $diachi.", ".$full_diachi,
                  "contactNumber" => $sodienthoai,
                  "email" => $email
              ]
          ],
          "customer" => $customer,
          "surchages" => $surchages,
          "payments" => $payments
      );
      // Chuyển đổi dữ liệu thành JSON
      $jsonData = json_encode($orderData);

      // check gui lan
      DB_que("UPDATE `#_order` SET kiot_dagui = `kiot_dagui` + 1, `kiot_timegui` = '".time()."' WHERE id = '".$ro['id']."' LIMIT 1");
      // 
      // URL của API
      $url = "https://public.kiotapi.com/orders";
      $options = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $jsonData,
        CURLOPT_HTTPHEADER => [
            'Retailer: ' . $retailer,
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json'
        ],
      ];

      // Khởi tạo một kết nối cURL
      $ch = curl_init();
      curl_setopt_array($ch, $options);

      // Thực hiện yêu cầu và nhận phản hồi
      $response = curl_exec($ch);

      // Kiểm tra lỗi cURL
      if (curl_errno($ch)) {
        echo 'CURL Error: ' . curl_error($ch);
      }

      // Đóng kết nối cURL
      curl_close($ch);

      // Hiển thị phản hồi từ API
      echo $response;
    }
    //
  }

  echo "------------------------ <br/><br/><br/>";

  check_dh_theo_makh ();
  function check_dh_theo_makh () {
    $currentTimestamp = time() - 10; // duyet lai don hang sau 10 s
    $currentTimestamp_end = time() - 18000; //
    // lay don hang co luot gui va time duyet tu 
    $_order = DB_que("SELECT * FROM `#_order` WHERE is_kiot = 0 AND (kiot_dagui <> 0 OR (kiot_timeduyet <= $currentTimestamp AND kiot_timeduyet >= $currentTimestamp_end) )  LIMIT 1" );
    $_order = DB_arr($_order, 1);
    if(!count($_order)) return false;

    $accessToken = kiot_gettoken();
    if($accessToken == 1) {
      file_get_contents("https://api.telegram.org/bot5126596014:AAHxnqbqBOf5X80bg2KEzF2wMyEKPTmBf-I/sendMessage?chat_id=-4018114045&text=loi lay token ->check_dh_theo_makh...".date("d-m-Y H:i:s")); 
      return;
    }

    // luu time duyet
    DB_que("UPDATE `#_order` SET kiot_timeduyet  = '".time()."' WHERE id = '".$_order['id']."' LIMIT 1");
    // 
    $ngaydat = $_order['ngaydat'] - 1200;
    $ngaydat_end = $_order['ngaydat'] + 1200;

    $ngaydat = date("Y-m-d H:i:s", $ngaydat);
    $ngaydat_end = date("Y-m-d H:i:s", $ngaydat_end);

    $url = "https://public.kiotapi.com/orders";
    $retailer = "duocphamthienthuy";
    $params = array(
      // "customerCode" => $customerCode,
      "pageSize" => 100,
      "currentItem" => 0,
      "toDate"=> $ngaydat_end,
      "lastModifiedFrom"=> $ngaydat,
    );
    // print_r($params); 
    $url .= '?' . http_build_query($params);

    $options = array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array(
        'Retailer: ' . $retailer,
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json', // Thay đổi kiểu nếu cần thiết
        ),
    );

    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);

    if ($response === FALSE) {
        die('Error occurred while fetching data: ' . curl_error($ch));
    }

    curl_close($ch);

    $response = json_decode($response, true);

    if(empty($response['data'])) return false;

    foreach ($response['data'] as $rows_dh) {
      echo $rows_dh['description']." <br/>";
      $description = (int) str_replace(" - KHONG XOA", "", $rows_dh['description']);
      // update don hang
      echo "$description <br/>";
      if(empty($description)) continue;
      DB_que("UPDATE `#_order` SET is_kiot  = 1 WHERE id = '".$description."' LIMIT 1");
    }
  }

  dong_bo_sp_auto();
  function dong_bo_sp_auto(){
    //
    $gio = (int) date("H");
    $phut =(int) date("i");
    // chỉ chay 1 - 6 h
    if($gio < 1 || $gio > 6) return;
    $tongphut = $gio * 60 + $phut;

    // chay 3 phut 1 lan
    if ($tongphut % 3 != 0) return;
    $trang = ($tongphut - 60) / 3 + 1;

    //
    $accessToken = kiot_gettoken();
    if($accessToken == 1) {
          file_get_contents("https://api.telegram.org/bot5126596014:AAHxnqbqBOf5X80bg2KEzF2wMyEKPTmBf-I/sendMessage?chat_id=-4018114045&text=loi lay token ->dong_bo_sp_auto...".date("d-m-Y H:i:s")); 
        return;
    }
    
    $response = kiot_dongbo_allsp(0, $accessToken);
    $total = $response['total'];
    $text .= "<span class='ok2'>- Tìm thấy $total sản phẩm .. </span>";


    $sotrang = ceil($total / 100);
    if($sotrang <= $trang) {
      $text .= "<span class='ok2'>- Đã đồng bộ xong sản phẩm .. </span>";

      return;
    }

    $response = kiot_dongbo_allsp($trang, $accessToken);

    $text .= dong_bo_sp($response);

  }
1