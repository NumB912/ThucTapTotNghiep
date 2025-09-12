<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WishesTableSeeder extends Seeder
{
    public function run(): void
    {
        $wishes = [
            "Hôm nay là cơ hội để bạn trở thành phiên bản tốt nhất của mình.",
            "Mỗi ngày là một trang mới, hãy viết nên câu chuyện tuyệt vời.",
            "Bắt đầu ngày mới với nụ cười và lòng biết ơn.",
            "Hãy để năng lượng tích cực dẫn lối bạn hôm nay.",
            "Mọi khó khăn hôm nay là bài học cho ngày mai.",
            "Hãy sống hôm nay như thể đây là ngày quan trọng nhất.",
            "Niềm vui hôm nay sẽ tạo nên kỷ niệm tuyệt vời.",
            "Hãy để ánh nắng mai sưởi ấm trái tim bạn.",
            "Ngày mới, cơ hội mới, hãy nắm bắt nó.",
            "Mỗi sáng thức dậy là một phép màu, hãy trân trọng.",
            "Hãy bắt đầu ngày mới bằng điều gì đó bạn yêu thích.",
            "Tinh thần hứng khởi sẽ giúp bạn vượt qua mọi thử thách.",
            "Ngày hôm nay là cơ hội để yêu thương và cống hiến.",
            "Hãy tạo ra niềm vui thay vì đợi nó đến.",
            "Một ngày tích cực bắt đầu từ suy nghĩ tích cực.",
            "Hãy để trái tim bạn hướng về những điều tốt đẹp.",
            "Ngày hôm nay, hãy tin vào khả năng của bản thân.",
            "Mỗi khoảnh khắc đều quý giá, đừng để lãng phí.",
            "Hãy cười thật nhiều, niềm vui sẽ lan tỏa xung quanh.",
            "Đừng chờ đợi hoàn hảo, hãy bắt đầu ngay hôm nay.",
            "Hãy làm việc chăm chỉ hôm nay, thành công sẽ đến sớm thôi.",
            "Mỗi nỗ lực đều là bước tiến tới mục tiêu.",
            "Đừng sợ thất bại, hãy sợ bỏ lỡ cơ hội cố gắng.",
            "Hôm nay, hãy tập trung vào việc bạn có thể kiểm soát.",
            "Thử thách hôm nay là cơ hội để trưởng thành.",
            "Mỗi bước nhỏ hôm nay sẽ tạo nên kết quả lớn.",
            "Hãy hành động thay vì chỉ mơ ước.",
            "Thành công là kết quả của kiên trì từng ngày.",
            "Hãy đặt mục tiêu rõ ràng và theo đuổi nó đến cùng.",
            "Ngày hôm nay, hãy chứng minh bản thân bằng hành động.",
            "Hãy làm điều hôm nay mà bạn sẽ cảm ơn tương lai.",
            "Kiên nhẫn và cố gắng sẽ đưa bạn đến nơi bạn muốn.",
            "Đừng trì hoãn, hành động hôm nay là nền tảng cho mai sau.",
            "Hãy tập trung vào giải pháp thay vì vấn đề.",
            "Một ngày nỗ lực là một ngày tiến gần thành công.",
            "Hãy để kết quả hôm nay tự nói lên giá trị của bạn.",
            "Ngày hôm nay, hãy tạo ra giá trị thay vì tìm kiếm nó.",
            "Đừng sợ thử thách, hãy biến nó thành cơ hội.",
            "Hãy học hỏi từ mỗi sai lầm hôm nay.",
            "Thành công hôm nay bắt đầu từ quyết tâm của bạn.",
            "Suy nghĩ tích cực sẽ dẫn bạn đến kết quả tích cực.",
            "Hãy chăm sóc bản thân hôm nay và luôn yêu thương chính mình.",
            "Ngày mới là cơ hội để cân bằng tinh thần và cơ thể.",
            "Mỗi hơi thở sâu là sự bình yên cho tâm hồn.",
            "Hãy để niềm vui và hạnh phúc dẫn lối bạn.",
            "Một ngày khỏe mạnh là nền tảng của mọi thành công.",
            "Hãy vận động, ăn uống và nghỉ ngơi hợp lý hôm nay.",
            "Niềm tin vào bản thân sẽ giúp bạn vượt qua khó khăn.",
            "Hãy thả lỏng và tận hưởng những khoảnh khắc giản dị.",
            "Ngày hôm nay, hãy để nụ cười chữa lành mọi phiền muộn.",
            "Hãy ngủ đủ giấc để bắt đầu ngày mới tràn đầy năng lượng.",
            "Bình an hôm nay sẽ tạo nên hạnh phúc lâu dài.",
            "Hãy tạm gác lo lắng và tập trung vào hiện tại.",
            "Một ngày bình an là món quà tuyệt vời cho chính bạn.",
            "Hãy uống đủ nước và nuôi dưỡng cơ thể bằng thực phẩm tốt.",
            "Tâm trạng tích cực hôm nay sẽ thu hút điều tốt đẹp.",
            "Hãy cho phép bản thân nghỉ ngơi khi cần.",
            "Niềm vui hôm nay sẽ lan tỏa và chạm đến người khác.",
            "Hãy trân trọng từng khoảnh khắc, dù nhỏ bé.",
            "Tâm hồn bạn xứng đáng một ngày đầy bình yên.",

            // 61-80
            "Hãy thử làm điều gì đó hôm nay mà bạn chưa từng làm.",
            "Ngày mới là cơ hội để bạn sáng tạo và đổi mới.",
            "Sáng tạo hôm nay sẽ là thành tựu của ngày mai.",
            "Đừng ngần ngại khác biệt, chính điều đó làm bạn nổi bật.",
            "Hãy tìm niềm vui trong những điều giản dị.",
            "Ngày hôm nay, hãy nghĩ lớn và hành động táo bạo.",
            "Đừng để nỗi sợ kìm hãm khả năng sáng tạo của bạn.",
            "Hãy cho phép bản thân mắc lỗi và học hỏi từ nó.",
            "Mỗi ý tưởng hôm nay đều có thể thay đổi cuộc sống.",
            "Hãy làm điều bạn yêu thích, thành công sẽ theo sau.",
            "Sáng tạo không có giới hạn, hãy để trí tưởng tượng bay xa.",
            "Hãy tự tin thể hiện cá tính riêng hôm nay.",
            "Mỗi khoảnh khắc đều là cơ hội để tạo ra điều mới.",
            "Hãy biến thử thách thành ý tưởng độc đáo.",
            "Sáng tạo hôm nay sẽ mang đến niềm tự hào cho tương lai.",
            "Đừng ngại suy nghĩ khác biệt, chính nó tạo nên giá trị.",
            "Hãy học hỏi từ những người xung quanh để sáng tạo hơn.",
            "Ngày hôm nay, hãy thử một cách tiếp cận mới cho vấn đề cũ.",
            "Sự khác biệt của bạn chính là sức mạnh của bạn.",
            "Hãy biến ý tưởng nhỏ hôm nay thành thành tựu lớn.",

            // 81-100
            "Hãy tìm niềm vui trong từng việc bạn làm hôm nay.",
            "Ngày mới, hãy để lòng biết ơn dẫn đường.",
            "Niềm hạnh phúc hôm nay bắt đầu từ những điều giản dị.",
            "Hãy chia sẻ nụ cười và niềm vui với mọi người.",
            "Mỗi ngày là cơ hội để yêu thương và được yêu thương.",
            "Hãy sống trọn vẹn từng khoảnh khắc.",
            "Ngày hôm nay, hãy tạo ra kỷ niệm đáng nhớ.",
            "Hãy để niềm vui nhỏ bé hôm nay trở thành động lực lớn.",
            "Hạnh phúc không phải đích đến, mà là cách bạn sống hôm nay.",
            "Hãy tận hưởng hành trình hơn là chỉ mong đích đến.",
            "Niềm vui hôm nay sẽ giúp bạn mạnh mẽ hơn cho ngày mai.",
            "Hãy làm điều gì đó khiến trái tim bạn rung động.",
            "Hãy nhìn cuộc sống bằng ánh mắt lạc quan.",
            "Ngày hôm nay, hãy mỉm cười với chính mình.",
            "Hãy tôn vinh bản thân vì những nỗ lực mỗi ngày.",
            "Niềm vui và hạnh phúc hôm nay là lựa chọn của bạn.",
            "Hãy chia sẻ năng lượng tích cực với mọi người xung quanh.",
            "Mỗi ngày đều xứng đáng một lý do để cười.",
            "Hãy sống hôm nay thật trọn vẹn và ý nghĩa.",
            "Ngày mới là món quà, hãy mở ra và tận hưởng trọn vẹn."
        ];

        foreach ($wishes as $wish) {
            DB::table('wishes')->insert([
                'wish' => $wish,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
