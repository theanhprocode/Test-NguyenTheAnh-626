Ứng dụng sử dụng IntersectionObserver API để tự động phát/dừng video dựa vào vị trí cuộn:

Cách hoạt động:
Observer theo dõi từng video card (page.tsx → useEffect)

Threshold = 0.6

Chỉ khi ≥60% của video hiện trên màn hình thì mới phát
Tránh video bắt đầu phát khi chỉ mới thấy một chút

Cuộn xuống → Video tiếp theo tự động phát
Cuộn lên → Video cũ tự động dừng
Nếu cuộn ngang giữa 2 video → cả 2 đều dừng
# Test-NguyenTheAnh-626
