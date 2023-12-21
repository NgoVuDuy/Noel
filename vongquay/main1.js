(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7000; //7 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');

	//=====< Danh sách phần thưởng >=====
	const listGift = [
		{
			text: 'Móc khóa',
			percent: 0 / 100,
		},
		{
			text: 'Quà bí mật',
			percent: 100 / 100,
		},
		{
			text: 'Son dưỡng',
			percent: 0 / 100,
		},
		{
			text: 'Gấu bông',
			percent: 0 / 100,
		}
	];

	//=====< Số lượng phần thưởng >=====
	const size = listGift.length;

	//=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
	const rotate = 360 / size;

	//=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
	const skewY = 90 - rotate;
	// Giá trị khởi tạo đưa lên local 
	let gift_1

	listGift.map((item, index) => {
		//=====< Tạo thẻ li >=====
		const elm = document.createElement('li');

		//=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
		elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;

		//=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
		elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-${index + 1}"><b>${item.text}</b></p>`;

		//=====< Thêm vào thẻ ul >=====
		wheel.appendChild(elm);
	});

	/********** Hàm bắt đầu **********/
	const start = () => {
		showMsg.innerHTML = '';
		isRotating = true;
		//=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
		const random = Math.random();

		//=====< Gọi hàm lấy phần thưởng >=====
		const gift = getGift(random);

		//=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
		currentRotate += 360 * 10;

		//=====< Gọi hàm quay >=====
		rotateWheel(currentRotate, gift.index);

		//=====< Gọi hàm in ra màn hình >=====
		showGift(gift);
	};

	/********** Hàm quay vòng quay **********/
	const rotateWheel = (currentRotate, index) => {
		$('.wheel').style.transform = `rotate(${
			//=====< Góc quay hiện tại trừ góc của phần thưởng>=====
			//=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	/********** Hàm lấy phần thưởng **********/
	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			//=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
			currentPercent += item.percent;

			//=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		//=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====
		return list[0];
	};

	/********** In phần thưởng ra màn hình **********/
	const btn = document.querySelector(".btn-sm")

	const seletion = document.querySelector(".form-way-send")

	const form = document.querySelector(".form-container")

	const formLetter = document.querySelector(".form-container .form-letter")

	// console.log(formLetter)

	const main = document.getElementById("main")

	// lấy các thẻ input
	const inputs = document.querySelectorAll("input")
	// lấy các thẻ seletion
	const seletions = document.querySelectorAll("seletion")
	// lấy thẻ textarea 
	const textarea = document.querySelectorAll("textarea")




	btn.addEventListener('click', function(event) {
		
		if(seletion.value == "tructiep") {
			event.preventDefault()
			form.style.display = "none"
			main.style.display = "block"
			// window.location.href = "vongquay/rotation.html"
		}
	})
	const showGift = gift => {
		let timer = setTimeout(() => {
			isRotating = false;

			// showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
			Swal.fire({
				title: `Chúc mừng bạn đã trúng ${gift.text}`,
				background: 'rgb(115, 149, 198)',
				color: "white"
			
			
			}).then((result) => {
				if(result.isConfirmed) {
					// localStorage.setItem("gift", gift.text)
                
				var newInput = document.createElement("input");
				newInput.setAttribute("type", "text");
				newInput.setAttribute("name", "gift");
				newInput.value = gift.text;
				formLetter.appendChild(newInput);
				formLetter.submit();
				//window.location.reload()
				console.log(newInput.value)
				}
			})

			clearTimeout(timer);
		}, timeRotate);
	};

	/********** Sự kiện click button start **********/
	btnWheel.addEventListener('click', () => {
		!isRotating && start();
	});
})();
