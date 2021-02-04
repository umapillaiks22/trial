package api

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	pb "github.com/Yash-Handa/drowsiness_detector/src/backend/server/protos"
	"google.golang.org/grpc"
)

var (
	port = fmt.Sprintf(":%s", os.Getenv("PORT"))
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

// StartServer starts a server
func StartServer() error {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return err
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		return err
	}

	return nil
}
