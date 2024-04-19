function selecting(idval){
      console.log(idval)
      document.getElementById("imageprocessing").style.display = "inline"
      const new_image_element = document.getElementById('img_processing')
      new_image_element.innerHTML = "<img id='processimage' src='./resources/images/"+idval+".JPG' class='card-img-top'  width='2rem' height='250px'>"
      document.getElementById("imageprocessing").scrollIntoView()
      const imageElement = document.getElementById('processimage');
    imageElement.onload = () => {
        analyzeImage(imageElement);
    };

    }

    function analyzeImage(imageElement) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match the image
        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;

        // Draw the image onto the canvas
        context.drawImage(imageElement, 0, 0);

        // Get pixel data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let reddishCount = 0;
        let blueishCount = 0;
        let greenishCount = 0;

        // Iterate through pixel data
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > g + b) {
                reddishCount++;
            } else if (b > r + g) {
                blueishCount++;
            } else {
                greenishCount++;
            }
        }

        const totalPixels = data.length / 4;
        const reddishPercentage = (reddishCount / totalPixels) * 100;
        const blueishPercentage = (blueishCount / totalPixels) * 100;
        const greenishPercentage = (greenishCount / totalPixels) * 100;

        if (reddishPercentage > 50) {
            console.log('Image is reddish.');
        } else if (blueishPercentage > 50) {
            console.log('Image is blueish.');
        } else {
            console.log('Image is greenish.');
        }
    }